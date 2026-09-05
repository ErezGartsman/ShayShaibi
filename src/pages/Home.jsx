import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import ProcessOrbit from '../components/ProcessOrbit.jsx'
import { projects } from '../data/projects.js'
import portrait from '../assets/portrait.png'
import useInViewAutoplay from '../hooks/useInViewAutoplay.js'

const ease = [0.22, 1, 0.36, 1]

const heroRoles = ['DESIGNER', 'RESEARCH', 'STRATEGIST']

/* Vertical slide/fade word-cycler: "UX/UI" stays put, the role after it loops.
   The invisible "STRATEGIST" reference (longest option) reserves a stable box so
   the swap never reflows the line. Only the current word is ever mounted — each
   tick unmounts it (exits upward) and mounts the next (enters from below), so the
   motion is always the same direction, including the STRATEGIST -> DESIGNER wrap
   (comparing raw index numbers there made that one step reverse direction). */
function RotatingRole() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroRoles.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block overflow-hidden align-top">
      <span className="invisible" aria-hidden="true">STRATEGIST</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={heroRoles[index]}
          className="absolute inset-0"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 16 }}
        >
          {heroRoles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Hero() {
  // The intro paragraph stays hidden until the user begins to scroll
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => {
    if (v > 24) setScrolled(true)
  })

  return (
    <section id="top" className="relative min-h-screen px-5 pb-6 pt-32 sm:px-10 sm:pb-16">
      {/* Name: slides in from the left on load */}
      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease, delay: 0.15 }}
        className="font-display text-xl uppercase leading-none tracking-[0.2em] text-ink sm:text-2xl ml-0 sm:ml-10"
      >
        Shay Shaibi
      </motion.h1>

      {/* Mobile only: giant PRODUCT MANAGER, breathing room above/below, with a centered scale reveal */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.3 }}
        className="mt-4 mb-4 origin-left font-display text-[clamp(4rem,22vw,6rem)] uppercase leading-[0.9] tracking-tight text-ink md:hidden"
      >
        <span className="sr-only">UX/UI Designer</span>
        <span aria-hidden="true">UX/UI <RotatingRole /></span>
      </motion.h2>
      {/* Mobile only: compact subtitle, same full-width block as the title above so text-right flushes to its exact edge.
          Animation kept 1:1 with the desktop location line below (same initial/animate/transition). */}
      <motion.h3
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease, delay: 0.15 }}
        className="mt-0 text-right font-display text-[24px] uppercase tracking-[4.8px] text-ink md:hidden"
      >
        Based in Kfar Tavor
      </motion.h3>

      <div className="mt-6 grid items-center gap-12 lg:mt-20 lg:grid-cols-[minmax(0,380px)_1fr]">
        {/* Portrait: sits inside the section's own px-5 padding on phones (no bleed), flush with the text above; fixed 340x476 from sm up */}
        <div className="relative z-20 ml-0 sm:ml-12">
          <motion.img
            src={portrait}
            alt="Shay Shaibi"
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            transition={{ duration: 1.4, ease, delay: 0.15 }}
            className="h-[60vh] w-full object-cover grayscale sm:h-[476px] sm:w-[340px]"
          />
        </div>

        <div className="relative z-10 flex flex-col items-start h-full lg:items-stretch lg:pl-8 pb-0 sm:pb-4">
          {/* Job title: massive structural heading, desktop/tablet only — establishes the
              same visual weight as the "Shay Shaibi" name / project titles, sitting
              directly above the location line below it. */}
          <motion.h2
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.1 }}
            className="hidden font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-ink md:block lg:self-end mr-8 lg:mr-16 mt-30"
          >
            <span className="sr-only">UX/UI Designer</span>
            <span aria-hidden="true">UX/UI <RotatingRole /></span>
          </motion.h2>
          {/* Location: slides in from the right, sized close to the name — desktop/tablet only, mobile uses the compact subtitle above */}
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
            className="hidden font-display text-[clamp(1.2rem,1.8vw,1.6rem)] uppercase leading-none tracking-[0.2em] text-ink md:block lg:self-end mr-8 lg:mr-16 mt-2 mb-auto"
          >
            Based in Kfar Tavor
          </motion.p>

          {/*
            Editorial overlap: STATIC #F1F1F1 box extends left behind the portrait
            and its RIGHT edge cuts through the middle of the intro text, so the text
            straddles the box (left half on grey, right half on white). Only the text animates.
          */}
          <div className="relative max-w-lg">
            <div
              aria-hidden="true"
              className="absolute -z-10 hidden bg-[#F1F1F1] lg:block"
              style={{ inset: '-8rem 50% -1.5rem -26.5rem' }}
            />
            <motion.p
              initial={{ opacity: 0, y: 120 }}
              animate={scrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
              transition={{ duration: 1.7, ease }}
              className="relative w-full max-w-full break-words text-left font-mono leading-relaxed text-ink md:hidden"
              style={{ fontSize: 20, fontWeight: 300 }}
            >
              I don't design until I <strong className="font-medium">understand</strong>.{' '}
              <strong className="font-medium">Research</strong> comes first,{' '}
              <strong className="font-medium">curiosity</strong> follows, and every detail has a{' '}
              <strong className="font-medium">reason</strong>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 120 }}
              animate={scrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
              transition={{ duration: 1.9, ease }}
              className="relative hidden text-left font-mono leading-relaxed text-ink md:block"
              style={{ fontSize: 21, fontWeight: 300 }}
            >
              I don't design until I <strong className="font-medium">understand</strong>.{' '}
              <strong className="font-medium">Research</strong> comes first,{' '}
              <strong className="font-medium">curiosity</strong> follows, and every detail has a{' '}
              <strong className="font-medium">reason</strong>.
            </motion.p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-1 flex justify-start lg:mt-20 lg:justify-center"
      >
        <a
          href="#work"
          className="flex min-h-[44px] items-center font-mono text-base uppercase tracking-[0.01em] text-ink transition-opacity hover:opacity-60 sm:text-lg"
        >
          <span className="rule-link">Scroll to explore ↘</span>
        </a>
      </motion.div>
    </section>
  )
}

function ProjectSection({ project }) {
  const videoRef = useInViewAutoplay()

  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      {/* Section keeps its original compact aspect-video card size (sm+: full
          screen) — the video is NOT stretched. The clip that was hiding the
          mobile "View project" link is now scoped to the VIDEO only: the video +
          gradient live in their own absolute overflow-hidden wrapper, while the
          section itself is no longer overflow-hidden. So the overlaid
          title/headline/View-project content can spill past the card's bottom
          edge without being cropped, which is what made the link vanish before. */}
      <section className="relative flex aspect-video flex-col justify-end bg-dark px-0 pt-0 pb-0 sm:aspect-auto sm:min-h-screen sm:px-10 sm:pb-8 sm:pt-24 lg:px-16">

        <div className="absolute inset-0 z-0 overflow-hidden">
          {(project.slug === 'nexus' || project.slug === 'smartrip') && (
            <video
              ref={videoRef}
              src={`/${project.slug}-video.mp4`}
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Title/headline now visible at every breakpoint, matching the NAZ
            reference — previously sr-only below md (only "View project" was
            visible), which also incidentally gave the wrapping <Link> a
            distinguishing accessible name; that's preserved just as well now
            since the text is a normal visible element instead.
            duration/ease slowed to the same luxe glide as the About image row, per the
            "any project cards" instruction — applies at every breakpoint since these Reveals
            aren't breakpoint-gated themselves. */}
        <div className="relative z-10 px-6 pb-4 sm:p-0 sm:-mb-2">
          <Reveal amount={0.3} duration={1} ease={[0.16, 1, 0.3, 1]}>
            <p className="font-display text-xs uppercase tracking-[0.35em] text-white mb-1 md:mb-5 md:text-xl">
              {project.title}
            </p>
          </Reveal>
          <Reveal delay={0.1} amount={0.3} duration={1} ease={[0.16, 1, 0.3, 1]}>
            <h2 className="font-display uppercase text-white text-[clamp(1rem,5vw,1.375rem)] leading-[1.05] tracking-[-0.01em] md:text-[clamp(2.6rem,7.5vw,6.5rem)] md:leading-[0.95] md:tracking-[-0.02em]">
              {project.homeStatement}
            </h2>
          </Reveal>
          {/* No Reveal wrapper here, deliberately: this link sits at the very
              bottom of the card, and a whileInView reveal's 30% threshold was
              never met there, so it stayed at opacity 0 AND its initial 36px
              down-translation pushed it down — invisible on mobile. Rendered
              directly it's always present. Combined with the video-only clip
              wrapper above (the section itself is no longer overflow-hidden),
              the link can neither be clipped nor stuck-hidden. (Title/headline
              keep their reveals; they sit higher and trigger normally.) */}
          <p className="rule-link mt-2 w-fit font-mono text-sm uppercase tracking-[0.1em] text-white transition-opacity group-hover:opacity-60 sm:mt-10 sm:text-base sm:text-lg">
            View project ↘
          </p>
        </div>
      </section>
    </Link>
  )
}

const aboutFacts = [
  'Research isn\'t a step in my process. It\'s the foundation.',
  'I look for the real problem before I design a single screen.',
  'Good design is accessible, clear, and built with purpose, not trends.',
  'I want to help shape what UX/UI becomes next, not just follow it.',
  'Every detail has a reason.',
]

const philosophyFactsDesktop = [
  'Research isn\'t a step in my process. It\'s the foundation.',
  'I look for the real problem before I design a single screen.',
  'Good design is accessible, clear, and built with purpose, not trends.',
  'I want to help shape what UX/UI becomes next, not just follow it. Every detail has a reason.',
]

const aboutImages = [
  { src: '/about-field.jpg', alt: 'Shay with her dog, Thor' },
  { src: '/about-speaking.jpg', alt: 'Shay at the Maroon 5 concert in Israel' },
  { src: '/about-work.jpg', alt: 'Shay by the sea' },
]

// Mobile: aspect-[398/266] w-full max-w-[398px] (398x266 landscape). Desktop: literal
// w-[286px] h-[191px]. The desktop trio's own container (below) is widened from max-w-3xl
// to fit 3x286px+gaps exactly — it would otherwise overflow max-w-3xl (768px vs the
// 906px three 286px images + two 24px gaps actually need).
function ImageSlot({ item }) {
  return (
    <div className="relative aspect-[398/266] w-full max-w-[398px] overflow-hidden bg-panel lg:aspect-auto lg:h-[191px] lg:w-[286px]">
      <img
        src={item.src}
        alt={item.alt}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

const aboutColumns = [
  {
    label: 'MY FAVORITE SUPERHERO',
    body: 'Thor is named after my favorite Marvel superhero, and yes, I\'m completely obsessed with Marvel. I\'ve watched every movie at least twice and somehow still find new details to notice every time. He\'s my favorite little superhero and one of the happiest parts of my life.',
  },
  {
    label: 'A NIGHT TO REMEMBER',
    body: 'This was at the Maroon 5 show in Israel, and one of those moments I still can\'t believe actually happened. I was so excited that I nearly fainted, and somehow I even ended up being featured on his Instagram Story. Definitely one of those memories that stays with you.',
  },
  {
    label: 'MY HAPPY PLACE',
    body: 'The sea, travel, and time away are an essential part of my life. They give me space to slow down, recharge, and find inspiration. Some of my best creative ideas come when I\'m not actively looking for them, just taking in a new place, a different view, or a quiet moment by the water.',
  },
]

const education = [
  ['2020 — 2025', 'Visual Communication & Education', 'University of Haifa. Studied Visual Communication and Education over five years, developing a strong foundation in visual thinking, communication, design, and understanding how people learn and interact with information.'],
]

function AboutSection() {
  return (
    <section id="about" className="px-4 pb-0 pt-[60px] sm:px-10 sm:pb-6 sm:pt-28">
      {/* Mobile-only About Me text block: exact nested structure + typography from the
          430px reference DOM audit (kicker+headline share a gap-[10px] subgroup, inside a
          gap-4 outer wrapper alongside one single paragraph — a genuinely different DOM
          shape than desktop's kicker-then-2-col-grid layout below, not just different
          classes on the same elements, hence the two separate blocks). Images untouched. */}
      <div className="flex w-full max-w-[398px] flex-col gap-4 md:hidden">
        <div className="flex flex-col gap-[10px]">
          <Reveal>
            <h2 className="m-0 font-display text-[32px] font-normal uppercase leading-[59px] tracking-[2.56px] text-ink">
              About Me
            </h2>
          </Reveal>
          <Reveal amount={0.3}>
            <div style={{ fontFamily: "'Sofia Sans Condensed', sans-serif" }}>
              <p className="m-0 text-[32px] font-normal uppercase leading-[32px] tracking-[1.6px] text-ink">
                I don't design
              </p>
              <p className="m-0 text-[32px] font-normal uppercase leading-[32px] tracking-[1.6px] text-ink">
                until I understand
              </p>
            </div>
          </Reveal>
        </div>
        {/* All facts joined into one continuous paragraph, no per-sentence elements/margins */}
        <Reveal amount={0.3}>
          {/* Exactly 1px larger than the mobile bio paragraphs below (the three-image captions
              use text-base = 16px, verified), per the relative-sizing rule */}
          <p className="m-0 w-full max-w-full break-words font-mono text-[17px] font-normal leading-[24px] tracking-[1px] text-ink">
            {aboutFacts.join(' ')}
          </p>
        </Reveal>
      </div>

      {/* Desktop: kicker */}
      {/* שינינו את ה-pl-[80px] ל-pl-[30px] כדי לקחת הכל שמאלה. אם חסר, תשנה ל-10px או 0 */}
      <Reveal className="hidden md:block md:pl-[22px]"> 
        {/* הוספנו font-bold כדי לעבות את המשקל של הכותרת */}
        <h2 className="font-display font-semibold text-[clamp(1.3rem,2.4vw,1.8rem)] uppercase leading-none tracking-[0.25em] text-ink">
          About Me
        </h2>
      </Reveal>

      {/* Desktop: headline + philosophy on the left (own flex column, so the
          paragraph shares the exact same left edge as the headline above it —
          both are plain block children, no offsetting margins needed); the
          process orbit fills the white space on the right, lg+ only, where
          there's enough width for it. */}
      <div className="hidden gap-8 md:mt-12 md:grid lg:grid-cols-[3fr_2fr] lg:gap-16 md:pl-[22px]">
        <div className="flex flex-col gap-8">
          <Reveal amount={0.3} className="min-w-0">
            <h3
              className="text-[64px] font-normal uppercase leading-[64px] text-ink"
              style={{
                fontFamily: "'Sofia Sans Condensed', sans-serif",
                letterSpacing: '1.6px',
              }}
            >
              I don't design
              <br className="hidden md:block" />
              until I understand
            </h3>
          </Reveal>

          <Reveal delay={0.12} amount={0.3}>
            <div
              className="space-y-2 text-ink max-w-lg"
              style={{
                fontFamily: "'Sofia Sans Condensed', sans-serif",
                fontWeight: 400,
                fontSize: '20px',
                letterSpacing: '1.6px',
                lineHeight: '26px',
              }}
            >
              {philosophyFactsDesktop.map((f) => (
                <p key={f}>{f}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} amount={0.3} className="hidden lg:flex lg:items-center lg:justify-center">
          <ProcessOrbit />
        </Reveal>
      </div>

      {/* Desktop: three panels side by side, sharing the exact same grid-cols-3 gap-10
          track as the heading/paragraph row below (same section padding, no mx-auto/
          max-width of its own), so each image's left edge lines up with its heading's.
          mt-[90px] (was 45px): the intro paragraph is one line shorter than NAZ's reference
          (4 vs 5 lines), so matching NAZ's exact scroll depth for the images needs extra
          compensation beyond the text block's own height difference — tuned toward the upper
          half of the requested 80-100px range. duration/ease slowed to a luxe glide per
          spec, applied only to this image row (Reveal's site-wide default is untouched). */}
      <div className="mt-[90px] hidden grid-cols-3 gap-10 lg:grid">
        {aboutImages.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.08} amount={0.3} duration={1} ease={[0.16, 1, 0.3, 1]}>
            <ImageSlot item={img} />
          </Reveal>
        ))}
      </div>

{/* Mobile+tablet: strict Title -> Text -> Image sequence per column, through lg: (see note above) */}
      <div className="mt-14 space-y-10 lg:hidden">
        {aboutColumns.map((c, i) => (
          <div key={c.label}>
            <Reveal amount={0.3}>
              <h3 className="mb-4 font-sans text-xl text-dim">{c.label} ↘</h3>
            </Reveal>
            <Reveal amount={0.3}>
              <p
                className="w-full max-w-full break-words text-ink"
                style={{
                  fontFamily: '"Spline Sans Mono", monospace',
                  fontWeight: 400,
                  fontSize: '18px', // שים לב: במובייל שמתי 18px שיראה נעים בעין, אבל אם בא לך ענק כמו בדסקטופ אפשר לשנות ל-'20px'
                  lineHeight: '1.2em',
                  letterSpacing: '0.01em',
                  color: '#101010',
                }}
              >
                {c.body}
              </p>
            </Reveal>
            <Reveal amount={0.3} className="mt-6 block">
              <ImageSlot item={aboutImages[i]} />
            </Reveal>
          </div>
        ))}
      </div>

      {/* Desktop: three columns side by side, snug against the images above them */}
      <div className="mt-6 hidden gap-14 lg:grid lg:grid-cols-3 lg:gap-10">
        {aboutColumns.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.08}>
            <div>
              <h3 className="mb-8 font-sans text-xl text-dim sm:text-2xl">{c.label} ↘</h3>
              <p 
                className="text-ink"
                style={{
                  fontFamily: '"Spline Sans Mono", monospace',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '1.2em',
                  letterSpacing: '0.01em',
                  color: '#101010',
                }}
              >
                {c.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Education */}
      {/* שינוי 1: הקטנו את המרווח העליון במובייל מ-28 ל-12 */}
      <Reveal className="mt-12 md:mt-28">
        {/* שינוי 2: שינינו לגודל 32px במובייל שיתאים ל-ABOUT ME */}
        <h2 className="font-display text-[32px] md:text-[clamp(1.15rem,2.2vw,1.6rem)] uppercase leading-none tracking-[2.56px] md:tracking-[0.3em] text-ink">
          Education
        </h2>
      </Reveal>

      {/* שינוי 3: הקטנו את המרחק בין הכותרת לתפקיד הראשון במובייל מ-14 ל-6 */}
      <div className="mt-6 md:mt-14">
        {education.map(([period, title, body]) => (
          <Reveal key={title}>
            {/* שינוי 4: הקטנו את המרווחים בין תפקיד לתפקיד מ-py-8 ל-py-4 במובייל */}
            <div className="grid gap-2 border-t border-line-soft py-4 md:py-8 md:grid-cols-[180px_1fr]">
              <p className="font-mono text-sm uppercase tracking-[0.15em] text-dim">{period}</p>
              <div>
                <h3 className="font-sans text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 max-w-2xl font-mono text-base leading-relaxed text-grey">{body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  // Belt-and-suspenders alongside ScrollToTop.jsx + history.scrollRestoration='manual'
  // (main.jsx): only forces top-of-page when there's no #hash to honor, so it never
  // fights the intentional /#work or /#about anchor-scroll.
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <Hero />
      <div id="work">
        {(projects ?? []).map((p) => (
          <ProjectSection key={p.slug} project={p} />
        ))}
      </div>
      <AboutSection />
    </>
  )
}
