import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { projects } from '../data/projects.js'
import portrait from '../assets/portrait.png'

const ease = [0.22, 1, 0.36, 1]

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
        Erez Gartsman
      </motion.h1>

      {/* Mobile only: giant PRODUCT MANAGER, breathing room above/below, with a centered scale reveal */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.3 }}
        className="mt-4 mb-4 origin-left font-display text-[clamp(4rem,22vw,6rem)] uppercase leading-[0.9] tracking-tight text-ink md:hidden"
      >
        Product Manager
      </motion.h2>
      {/* Mobile only: compact subtitle, same full-width block as the title above so text-right flushes to its exact edge.
          Animation kept 1:1 with the desktop location line below (same initial/animate/transition). */}
      <motion.h3
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease, delay: 0.15 }}
        className="mt-0 text-right font-display text-[24px] uppercase tracking-[4.8px] text-ink md:hidden"
      >
        Based in Hadera
      </motion.h3>

      <div className="mt-6 grid items-center gap-12 lg:mt-20 lg:grid-cols-[minmax(0,380px)_1fr]">
        {/* Portrait: sits inside the section's own px-5 padding on phones (no bleed), flush with the text above; fixed 340x476 from sm up */}
        <div className="relative z-20 ml-0 sm:ml-12">
          <motion.img
            src={portrait}
            alt="Erez Gartsman"
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            transition={{ duration: 1.4, ease, delay: 0.15 }}
            className="h-[60vh] w-full object-cover grayscale sm:h-[476px] sm:w-[340px]"
          />
        </div>

        <div className="relative z-10 flex flex-col items-start h-full lg:items-stretch lg:pl-8 pb-0 sm:pb-4">
          {/* Job title: massive structural heading, desktop/tablet only — establishes the
              same visual weight as the "Erez Gartsman" name / project titles, sitting
              directly above the location line below it. */}
          <motion.h2
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.1 }}
            className="hidden font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-ink md:block lg:self-end mr-8 lg:mr-16 mt-30"
          >
            Product Manager
          </motion.h2>
          {/* Location: slides in from the right, sized close to the name — desktop/tablet only, mobile uses the compact subtitle above */}
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
            className="hidden font-display text-[clamp(1.2rem,1.8vw,1.6rem)] uppercase leading-none tracking-[0.2em] text-ink md:block lg:self-end mr-8 lg:mr-16 mt-2 mb-auto"
          >
            Based in Hadera
          </motion.p>

          {/*
            Editorial overlap: STATIC #F1F1F1 box extends left behind the portrait
            and its RIGHT edge cuts through the middle of the intro text, so the text
            straddles the box (left half on grey, right half on white). Only the text animates.
          */}
          <div className="relative max-w-md">
            <div
              aria-hidden="true"
              className="absolute -z-10 hidden bg-[#F1F1F1] opacity-90 lg:block"
              style={{ top: '-2rem', bottom: '-3.5rem', right: '42%', left: '-27rem' }}
            />
            <motion.p
              initial={{ opacity: 0, y: 120 }}
              animate={scrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
              transition={{ duration: 1.7, ease }}
              className="relative text-left font-mono leading-relaxed text-ink md:hidden"
              style={{ fontSize: 20, fontWeight: 300 }}
            >
              Building with <strong className="font-medium">data</strong> and{' '}
              <strong className="font-medium">intention</strong>. Guided by{' '}
              <strong className="font-medium">research</strong> and zero patience for{' '}
              <strong className="font-medium">broken processes</strong>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 120 }}
              animate={scrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
              transition={{ duration: 1.7, ease }}
              className="relative hidden text-left font-mono leading-relaxed text-ink md:block"
              style={{ fontSize: 20, fontWeight: 300 }}
            >
              Guided by <strong className="font-medium">research</strong>, I turn human{' '}
              <strong className="font-medium">empathy</strong> into precise,{' '}
              <strong className="font-medium">data-backed execution</strong>. Zero patience for{' '}
              <strong className="font-medium">broken processes</strong>.
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
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <section className="relative flex aspect-video flex-col justify-end overflow-hidden bg-dark px-0 pt-0 pb-0 sm:aspect-auto sm:min-h-screen sm:px-10 sm:pb-8 sm:pt-24 lg:px-16">

        {(project.slug === 'nexus' || project.slug === 'smartrip') && (
          <video
            src={`/${project.slug}-video.mp4`}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-80"
          />
        )}

        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Mobile (below md): only "View project" is visible, per reference — title/headline are
            sr-only so the link keeps a meaningful accessible name. md+: title and headline are
            restored, fully visible, matching the original desktop design.
            duration/ease slowed to the same luxe glide as the About image row, per Erez's
            "any project cards" instruction — applies at every breakpoint since these Reveals
            aren't breakpoint-gated themselves (only their sr-only/not-sr-only visibility is). */}
        <div className="relative z-10 px-6 pb-6 sm:p-0 sm:-mb-2">
          <Reveal amount={0.3} duration={1} ease={[0.16, 1, 0.3, 1]}>
            <p className="sr-only font-display uppercase tracking-[0.35em] text-white md:not-sr-only md:mb-5 md:text-xl">
              {project.title}
            </p>
          </Reveal>
          <Reveal delay={0.1} amount={0.3} duration={1} ease={[0.16, 1, 0.3, 1]}>
            <h2 className="sr-only font-display uppercase text-white md:not-sr-only md:text-[clamp(2.6rem,7.5vw,6.5rem)] md:leading-[0.95] md:tracking-[-0.02em]">
              {project.homeStatement}
            </h2>
          </Reveal>
          <Reveal delay={0.2} amount={0.3} duration={1} ease={[0.16, 1, 0.3, 1]}>
            <p className="rule-link mt-2 w-fit font-mono text-sm uppercase tracking-[0.1em] text-white transition-opacity group-hover:opacity-60 sm:mt-10 sm:text-base sm:text-lg">
              View project ↘
            </p>
          </Reveal>
        </div>
      </section>
    </Link>
  )
}

const aboutFacts = [
  'I build products end-to-end, stripping away friction to find what actually works.',
  'I turn human empathy into precise, data-backed execution.',
  'Every screen and system must trace back to a real user problem.',
  'AI works on a leash. Details are the product.',
]

// Desktop-only philosophy copy — sharper, 3 lines (mobile keeps the original 4-sentence
// aboutFacts above, unchanged).
const philosophyFactsDesktop = [
  'I turn human empathy into precise, data-backed execution.',
  'My process blends structural logic with creative problem-solving.',
  'AI works on a leash. Details are the product.',
]

// כאן הכנסנו את התמונות במקום הטקסטים
const aboutImages = [
  { src: '/about-work.jpg', alt: 'Product Planning' },
  { src: '/about-speaking.jpg', alt: 'Community and Speaking' },
  { src: '/about-field.jpg', alt: 'Strategy and Vision' },
]

// הפונקציה הזו עכשיו מציגה תמונה במקום את טקסט ה-Placeholder
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
        className="h-full w-full object-cover grayscale"
      />
    </div>
  )
}

const aboutColumns = [
  {
    label: 'My Background',
    body: 'Dual-degree B.A. in Information Science & Communication at Bar-Ilan, fellow of the PM honors program. Five years leading a 75,000-member community. Before that, an IDF tank commander: fast decisions, incomplete information, real consequences.',
  },
  {
    label: 'My Philosophy',
    body: 'Every product starts with a named friction, not a feature idea. Research defines the requirements, data settles the arguments, and a screen that can\'t be traced to a real problem doesn\'t ship. Simulation beats apology.',
  },
  {
    label: 'My Toolkit',
    body: 'PRDs, thematic analysis, A/B testing, benchmarking. SQL, Python, DAX, Power BI. Figma, Jira, Base44. AI everywhere it earns its place, and never unaudited.',
  },
]

// Reverse-chronological: the ongoing "NOW" role leads, then the rest by start year descending
// (2024 -> 2023 -> 2018). Education entry removed per Erez's request.
const experience = [
  ['JULY 2026 — NOW', 'Clinical Product & Deployment (Ambient AI)', 'ARC Innovation (Sheba Medical Center). Orchestrating the deployment of an AI Ambient Listening platform (Scribe MD) across 14 clinics. Leading on-site integration, prompt engineering, and product refinement based on direct clinical feedback.'],
  ['2021 — 2026', 'Content Creator & Community Manager', 'Self-employed. Grew a complex community of over 75,000 members. Converted qualitative feedback and A/B test data from thousands of daily user interactions into precise content strategies that maximized engagement.'],
  ['2024 — 26', 'PR Specialist & Researcher', 'Maya Karvat Communications. Messaging strategy and qualitative market research for over 15 distinct brands.'],
  ['2023 — 24', 'Creative Lead & Content Strategist', 'Alfi Productions. Led over 20 creative projects from initial concept to final launch.'],
]

function AboutSection() {
  return (
    <section id="about" className="px-4 pb-0 pt-[60px] sm:px-10 sm:pb-6 sm:pt-28">
      {/* Mobile-only About Me text block: exact nested structure + typography from Erez's
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
                Product is not
              </p>
              <p className="m-0 text-[32px] font-normal uppercase leading-[32px] tracking-[1.6px] text-ink">
                what I do - it's how I decode the world
              </p>
            </div>
          </Reveal>
        </div>
        {/* All 4 facts joined into one continuous paragraph, no per-sentence elements/margins */}
        <Reveal amount={0.3}>
          {/* Exactly 1px larger than the mobile bio paragraphs below (My Background/Philosophy/
              Toolkit use text-base = 16px, verified), per Erez's relative-sizing rule */}
          <p className="m-0 font-mono text-[17px] font-normal leading-[24px] tracking-[1px] text-ink">
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

      {/* Desktop: headline + philosophy */}
      {/* גם פה, שינינו ל-pl-[30px] כדי שהכותרת הגדולה תזוז שמאלה יחד עם ה-ABOUT ME */}
      <div className="hidden gap-14 md:mt-12 md:grid lg:grid-cols-[3fr_2fr] lg:items-start md:pl-[22px]">
        <Reveal amount={0.3} className="min-w-0">
          <h3
            className="text-[64px] font-normal uppercase leading-[64px] text-ink"
            style={{
              fontFamily: "'Sofia Sans Condensed', sans-serif",
              letterSpacing: '1.6px',
            }}
          >
            Product is not
            <br className="hidden md:block" />
            <span className="whitespace-nowrap">what I do - it's how I decode</span>
            <br className="hidden md:block" />
            the world
          </h3>
        </Reveal>
        
        {/* 
            כאן הקסם של הפסקה: 
            1. lg:mt-[112px] דוחף אותה עוד יותר למטה (קודם היה 96).
            2. lg:-ml-[30px] מושך את הפסקה הספציפית הזו שמאלה (המינוס מושך שמאלה). 
        */}
        <Reveal delay={0.12} amount={0.3} className="lg:mt-[155px] lg:-ml-[183px]">
          <div className="space-y-1 font-mono text-[16px] leading-relaxed text-ink">
            {philosophyFactsDesktop.map((f) => (
              <p key={f}>{f}</p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Desktop: three compact panels side by side. max-w-[906px] = 3x286px images + 2x24px gaps
          exactly, since each ImageSlot is now a literal 286px wide (max-w-3xl was too narrow and
          would've overflowed/wrapped them). Gated at lg: (1024px), not md: — at md (768px) there
          isn't enough room for a literal 906px-wide grid (caught by the responsive audit: it
          overflowed the viewport at exactly 768px). The mobile Title->Text->Image block below
          covers the 768-1023 tablet range instead.
          mt-[90px] (was 45px): EG's intro paragraph is one line shorter than NAZ's reference
          (4 vs 5 lines), so matching NAZ's exact scroll depth for the images needs extra
          compensation beyond the text block's own height difference — tuned toward the upper
          half of Erez's requested 80-100px range. duration/ease slowed to a luxe glide per
          Erez's spec, applied only to this image row (Reveal's site-wide default is untouched). */}
      <div className="mx-auto mt-[90px] hidden max-w-[906px] grid-cols-3 gap-6 lg:grid">
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
              <p className="font-mono text-base leading-relaxed text-ink">{c.body}</p>
            </Reveal>
            <Reveal amount={0.3} className="mt-6 block">
              <ImageSlot item={aboutImages[i]} />
            </Reveal>
          </div>
        ))}
      </div>

      {/* Desktop: three columns side by side, no images (images shown separately above).
          Gated at lg: to stay synced with the image trio and the mobile/tablet block above —
          otherwise this and the Title->Text->Image block would both render in the 768-1023 range. */}
      <div className="mt-24 hidden gap-14 lg:grid lg:grid-cols-3 lg:gap-10">
        {aboutColumns.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.08}>
            <div>
              <h3 className="mb-8 font-sans text-xl text-dim sm:text-2xl">{c.label} ↘</h3>
              <p className="font-mono text-base leading-relaxed text-ink">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Experience */}
      {/* שינוי 1: הקטנו את המרווח העליון במובייל מ-28 ל-12 */}
      <Reveal className="mt-12 md:mt-28"> 
        {/* שינוי 2: שינינו לגודל 32px במובייל שיתאים ל-ABOUT ME */}
        <h2 className="font-display text-[32px] md:text-[clamp(1.15rem,2.2vw,1.6rem)] uppercase leading-none tracking-[2.56px] md:tracking-[0.3em] text-ink">
          Experience
        </h2>
      </Reveal>
      
      {/* שינוי 3: הקטנו את המרחק בין הכותרת לתפקיד הראשון במובייל מ-14 ל-6 */}
      <div className="mt-6 md:mt-14"> 
        {experience.map(([period, title, body]) => (
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
