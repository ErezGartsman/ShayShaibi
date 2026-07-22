import { useLayoutEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import MediaPlaceholder from '../components/MediaPlaceholder.jsx'
import Doodle from '../components/Doodle.jsx'
import { QuoteCard } from '../components/QuoteCard.jsx'
import { getProject, nextProject } from '../data/projects.js'

const ease = [0.22, 1, 0.36, 1]

/* NAZ-style CSS phone bezel — only used for Smartrip, whose captured media is
   genuinely phone-shaped (~0.46 aspect, matching 9:19.5 almost exactly).
   Nexus's media is landscape dashboard/browser footage; forcing that into this
   vertical frame with object-cover would crop out most of the image, so this
   frame is opted into per-project rather than applied to every case study. */
const phoneFrameClass =
  'relative mx-auto w-full max-w-[280px] md:max-w-[320px] aspect-[9/19.5] rounded-[50px] md:rounded-[70px] border-[12px] md:border-[15px] border-white shadow-[inset_-4px_-9px_7px_0px_rgba(0,0,0,0.19),1px_4px_24px_0px_rgba(0,0,0,0.35)] bg-white overflow-hidden flex-shrink-0'
const phoneFrameMediaClass = 'w-full h-full object-cover rounded-[35px] md:rounded-[55px]'

/* Desktop-only carousel chrome: one pair for the whole peek carousel, not one
   per card — QuoteCard's own small glass arrows stay mobile-only (md:hidden),
   since unhiding those literally would draw a duplicate arrow pair on every
   peeking card instead of the single pair the reference shows.
   Reference spec: bare 40px chevron — no disc, no background, black stroke —
   sitting outside the active card's edges (half the card's md:max-w-3xl cap,
   768px, plus clearance), over the dimmed peek zone rather than pinned to the
   viewport corners. */
function CarouselArrow({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous interview' : 'Next interview'}
      className={`absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center bg-transparent text-ink transition-opacity hover:opacity-60 md:flex ${
        dir === 'prev' ? 'left-[calc(50%-437px)]' : 'right-[calc(50%-437px)]'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === 'prev' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  )
}

/* 3-column doodle grid shared by / THE CAUSES and / THE CONSEQUENCES */
function TriadGrid({ items = [] }) {
  return (
    <div className="mx-auto mt-6 grid max-w-6xl gap-14 text-center md:mt-8 md:grid-cols-3 md:gap-10">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.08}>
          <div className="flex flex-col items-center">
            <Doodle name={item.icon} className="mb-8" />
            <h3 className="mb-4 font-sans text-lg font-semibold uppercase tracking-[0.02em] text-ink sm:text-xl">
              {item.title}
            </h3>
            <p className="max-w-xs font-sans text-base leading-relaxed text-grey">
              {item.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <Navigate to="/" replace />

  const next = nextProject(slug)

  /* Mobile research slider: infinite loop via a one-card buffer cloned onto
     each end — [lastClone, ...real, firstClone] — so both arrow-taps and raw
     touch swipes can cross the "boundary" and land on a clone, then a scroll
     debounce silently (no animation) snaps back to the equivalent real card.
     Real cards live at indices [1, quotes.length]; index 0 and the last index
     are the clones. */
  const quotes = project.research?.quotes ?? []
  const loopedQuotes =
    quotes.length > 1 ? [quotes[quotes.length - 1], ...quotes, quotes[0]] : quotes

  const quotesRef = useRef(null)
  const animRef = useRef(null)

  /* Which child (clones included) is currently centered — drives the desktop
     dimming of the peeking neighbors. Starts at 1, the first real card. */
  const [activeIdx, setActiveIdx] = useState(1)

  /* Card width is viewport-relative on desktop (65%, capped at max-w-3xl) so
     the step must be measured from an actual rendered card, not el.clientWidth. */
  const cardStep = () => {
    const el = quotesRef.current
    const card = el?.children[1] // index 1 = first real card, present at every breakpoint now
    if (!el || !card) return 0
    return card.getBoundingClientRect().width + (parseFloat(getComputedStyle(el).columnGap) || 0)
  }

  /* The child whose center currently sits nearest the container's center.
     Measured geometrically rather than derived from scrollLeft/step so it
     stays honest at the clamped ends of the track, where index math lies. */
  const nearestCenteredIdx = () => {
    const el = quotesRef.current
    if (!el) return 1
    const elRect = el.getBoundingClientRect()
    const center = elRect.left + elRect.width / 2
    let best = 1
    let bestDist = Infinity
    Array.from(el.children).forEach((child, i) => {
      const r = child.getBoundingClientRect()
      const d = Math.abs(r.left + r.width / 2 - center)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    return best
  }

  /* The true snap-center scrollLeft for a given card index — NOT index*step.
     Those only coincide when the card is exactly as wide as the container
     (mobile's w-full cards). Once desktop cards are narrower than the
     container (the peek carousel's 65%/max-w-3xl cards), index*step is the
     card's flush-left position; scroll-snap-align: center then silently
     re-snaps any such assignment to the true centered position, which sits
     (containerWidth - cardWidth)/2 earlier. Missing this made the initial
     mount position land noticeably short of centered on desktop — not a
     timing bug, a wrong formula. */
  const centeredScrollLeftFor = (index) => {
    const el = quotesRef.current
    const card = el?.children[index]
    if (!el || !card) return 0
    const cardRect = card.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    return Math.max(
      0,
      Math.min(
        el.scrollWidth - el.clientWidth,
        el.scrollLeft + (cardRect.left + cardRect.width / 2) - (elRect.left + elRect.width / 2),
      ),
    )
  }

  useLayoutEffect(() => {
    const el = quotesRef.current
    if (!el || quotes.length < 2) return
    el.scrollLeft = centeredScrollLeftFor(1) // start on the first real card, past the leading clone

    let settleTimer
    const onScroll = () => {
      setActiveIdx(nearestCenteredIdx())
      clearTimeout(settleTimer)
      settleTimer = setTimeout(() => {
        // Detect "landed on a clone" from the actual scroll extremes, not a
        // step-rounded index: the peek carousel can't fully center a card
        // sitting at either end of the scrollable range (there's no run-off
        // space beyond it to shift into), so a clamped clone position doesn't
        // round to an out-of-bounds index the way an unclamped one would —
        // it just silently reads as "the last real card" and the loop stalls.
        const atStart = el.scrollLeft <= 1
        const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1
        if (atStart) el.scrollLeft = centeredScrollLeftFor(quotes.length)
        else if (atEnd) el.scrollLeft = centeredScrollLeftFor(1)
      }, 150)
    }
    el.addEventListener('scroll', onScroll)
    return () => {
      clearTimeout(settleTimer)
      el.removeEventListener('scroll', onScroll)
    }
  }, [quotes])

  /* One card per arrow tap, mobile or desktop. Chromium cancels every smooth
     programmatic scroll on a snap-mandatory container (scrollBy/scrollTo/
     scrollIntoView all no-op), so this animates scrollLeft by hand. Snapping
     is parked for the duration of the glide: with it live, every per-frame
     assignment gets instantly re-snapped to the nearest snap point, which
     collapses the whole animation into one harsh jump. The animation lands
     exactly on the target card's snap-center position, so re-enabling snap
     afterwards causes no visible shift. */
  const scrollQuotes = (dir) => {
    const el = quotesRef.current
    if (!el) return
    const index = Math.max(
      0,
      Math.min(el.children.length - 1, Math.round(el.scrollLeft / cardStep()) + dir),
    )
    const target = centeredScrollLeftFor(index)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.scrollLeft = target
      return
    }
    if (animRef.current) cancelAnimationFrame(animRef.current)
    el.style.scrollSnapType = 'none'
    const start = el.scrollLeft
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 350)
      el.scrollLeft = start + (target - start) * (1 - Math.pow(1 - p, 3))
      if (p < 1) {
        animRef.current = requestAnimationFrame(tick)
      } else {
        animRef.current = null
        el.style.scrollSnapType = ''
      }
    }
    animRef.current = requestAnimationFrame(tick)
  }

  return (
    <article key={slug}>
      {/* ── Hero: full-bleed video plane, title + meta bottom-anchored ─── */}
      <header className="relative flex h-[100vh] w-full flex-col items-center justify-end overflow-clip px-[16px] pt-[142px] pb-[60px] md:px-[30px] md:pb-[72px] xl:px-[80px]">
        <div
          className="absolute inset-0 z-0 flex items-center justify-center"
          style={{ transform: 'perspective(1200px) rotateY(180deg)' }}
        >
          <video
            src={`/${project.slug}-video.mp4`}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full bg-transparent object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex w-full max-w-[1440px] flex-1 flex-col items-center justify-end">
          <div className="flex h-min w-full max-w-[1036px] flex-col items-center justify-start gap-[32px]">
            <motion.h1
              initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className="text-left font-display text-[28px] uppercase leading-[1.2] tracking-[0.02em] text-white md:text-center md:text-[38px] xl:text-[48px]"
            >
              {project.question}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.4 }}
              className="flex w-full max-w-[496px] flex-row flex-wrap items-center justify-start gap-[24px] xl:flex-nowrap xl:gap-[47px]"
            >
              {[
                ['Challenge', project.meta.challenge],
                ['Role', project.meta.role],
                ['Industry', project.meta.industry],
              ].map(([label, value]) => (
                <div key={label} className="flex w-min flex-col items-start gap-[21px]">
                  <div className="flex flex-row items-center gap-[8px]">
                    <p className="font-sans text-[15px] uppercase leading-[18px] text-[#AAA8A8]">
                      {label}
                    </p>
                    <svg
                      viewBox="0 0 20 20"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#AAA8A8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 5L15 15M15 15V7M15 15H7" />
                    </svg>
                  </div>
                  <p className="whitespace-nowrap font-mono text-[16px] uppercase leading-[19.2px] tracking-[0.16px] text-white">
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── / THE PROBLEM ─────────────────────────────────────────────── */}
      <section className="px-[16px] pt-[48px] sm:px-10 lg:pt-28">
        <div className="grid items-start gap-[24px] lg:grid-cols-[3fr_2fr] lg:gap-14">
          <div>
            <SectionTitle align="left">The Problem</SectionTitle>
            <Reveal delay={0.08}>
              <h3 className="mt-4 max-w-2xl font-display text-[24px] font-normal uppercase leading-[33.6px] tracking-[-0.24px] text-[#404040] md:mt-6">
                {project.problem.headline}
              </h3>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-xl font-mono text-[14px] font-light leading-[16.8px] tracking-normal text-[#404040] md:mt-6">
                {project.problem.body}
              </p>
            </Reveal>
          </div>
          {/\.mp4$/i.test(project.problem.media) ? (
            <Reveal className="lg:mt-4">
              {project.slug === 'smartrip' ? (
                <div className={phoneFrameClass}>
                  <video
                    src={project.problem.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={phoneFrameMediaClass}
                  />
                </div>
              ) : (
                <video
                  src={project.problem.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              )}
            </Reveal>
          ) : /\.(jpe?g|png)$/i.test(project.problem.media) ? (
            <Reveal className="lg:mt-4">
              {project.slug === 'smartrip' ? (
                <div className={phoneFrameClass}>
                  <img src={project.problem.media} alt="" className={phoneFrameMediaClass} />
                </div>
              ) : (
                <img
                  src={project.problem.media}
                  alt=""
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              )}
            </Reveal>
          ) : (
            <MediaPlaceholder
              label={project.problem.media}
              ratio="aspect-video md:aspect-[4/3]"
              className="lg:mt-4"
            />
          )}
        </div>
      </section>

      {/* ── / THE CAUSES ──────────────────────────────────────────────── */}
      <section className="px-[16px] pt-16 sm:px-10 md:pt-24">
        <SectionTitle>The Causes</SectionTitle>
        <TriadGrid items={project.causes} />
      </section>

      {/* ── / THE CONSEQUENCES ────────────────────────────────────────── */}
      <section className="px-[16px] pt-16 sm:px-10 md:pt-24">
        <SectionTitle>The Consequences</SectionTitle>
        <TriadGrid items={project.consequences} />
      </section>

      {/* ── / USER RESEARCH or / FIELD NOTES ──────────────────────────── */}
      <section className="bg-[#f4f4f4] px-4 py-12 sm:px-10 md:pt-24 md:pb-16">
        <SectionTitle>{project.research.label}</SectionTitle>
        <Reveal delay={0.08}>
          <p className="mt-[52px] text-center font-mono text-xl uppercase leading-[1.2] tracking-[0.06em] text-ink sm:text-2xl md:mt-8">
            {project.research.headline}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 text-center font-mono text-sm leading-[1.2] text-grey md:mt-6 md:leading-relaxed">
            {project.research.breakdown}
          </p>
        </Reveal>

        {/* Universal infinite-loop peek carousel, mobile and desktop alike:
            full-width card on mobile (one at a time), 65% of the container on
            desktop (capped at max-w-3xl) so the card never grows to fill the
            viewport — with a wide gap so the previous/next cards peek in
            elegantly at the sides regardless of how wide the screen is.
            Clones render at every breakpoint now — the loop mechanic depends
            on that buffer existing wherever the carousel does.
            overflow-y-hidden is load-bearing, not decorative: overflow-x-auto
            alone makes the UA compute overflow-y as auto per the CSS overflow
            spec (visible paired with a non-visible axis coerces to auto),
            which was trapping vertical swipes/scroll inside this container
            instead of the page. */}
        {/* Mobile track runs full-bleed (-mx-4) with its own px-4 + scroll-px-4:
            padding INSIDE the scrollport keeps both resting edges at a
            symmetric 16px — the section's outer padding alone can't do that,
            because trailing padding outside a scroll container collapses into
            the scrollable overflow on the right edge. md+ resets to the
            in-flow container, where the peek layout handles its own insets. */}
        <div className="relative mt-10 md:mt-24">
          <div
            ref={quotesRef}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-8 overflow-x-auto overflow-y-hidden px-4 scroll-px-4 md:mx-0 md:gap-24 md:px-0 md:scroll-px-0"
          >
            {loopedQuotes.map((q, i) => {
              const isClone = quotes.length > 1 && (i === 0 || i === loopedQuotes.length - 1)
              return (
                <QuoteCard
                  key={isClone ? `clone-${i === 0 ? 'start' : 'end'}` : q.source}
                  quote={q.quote}
                  source={q.source}
                  insight={q.insight}
                  therefore={q.therefore}
                  image={q.image}
                  dimmed={i !== activeIdx}
                  className="w-full max-w-[90%] flex-shrink-0 snap-center md:w-[65%] md:max-w-3xl"
                  onPrev={() => scrollQuotes(-1)}
                  onNext={() => scrollQuotes(1)}
                />
              )
            })}
          </div>
          <CarouselArrow dir="prev" onClick={() => scrollQuotes(-1)} />
          <CarouselArrow dir="next" onClick={() => scrollQuotes(1)} />
        </div>
      </section>

      {/* ── / THE SOLUTION ────────────────────────────────────────────── */}
      <section className="px-[16px] pt-16 pb-32 sm:px-10 md:pt-24">
        <SectionTitle>The Solution</SectionTitle>
        <div className="mx-auto mt-6 max-w-5xl space-y-16 md:mt-8 md:space-y-24">
          {(project.solution ?? []).map((block) => (
            <div key={block.headline}>
              <Reveal>
                <h3 className="text-center font-sans text-xl font-semibold text-ink sm:text-2xl">
                  {block.headline}
                </h3>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-base leading-relaxed text-grey sm:text-lg md:mt-6">
                  {block.body}
                </p>
              </Reveal>
              {/\.mp4$/i.test(block.media) ? (
                <Reveal className="mt-10">
                  {project.slug === 'smartrip' ? (
                    <div className={phoneFrameClass}>
                      <video
                        src={block.media}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className={phoneFrameMediaClass}
                      />
                    </div>
                  ) : (
                    <video
                      src={block.media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                  )}
                </Reveal>
              ) : /\.(jpe?g|png)$/i.test(block.media) ? (
                <Reveal className="mt-10">
                  {project.slug === 'smartrip' ? (
                    <div className={phoneFrameClass}>
                      <img src={block.media} alt="" className={phoneFrameMediaClass} />
                    </div>
                  ) : (
                    <img src={block.media} alt="" className="w-full h-auto rounded-lg shadow-xl" />
                  )}
                </Reveal>
              ) : (
                <MediaPlaceholder label={block.media} ratio={block.ratio} className="mt-10" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Next case ─────────────────────────────────────────────────── */}
      <Link to={`/projects/${next.slug}`} className="group block">
        <section className="bg-dark px-6 py-10 text-center sm:px-10 md:py-16">
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.25em] text-white/50">
            Next case study ↘
          </p>
          <p className="font-display text-[clamp(2.6rem,7vw,6rem)] uppercase leading-none tracking-[-0.01em] text-white transition-opacity group-hover:opacity-60">
            {next.title}
          </p>
        </section>
      </Link>
    </article>
  )
}
