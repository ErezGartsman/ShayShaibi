import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const steps = [
  {
    number: '01',
    title: 'INVESTIGATE',
    tagline: "Before I design anything, I need to understand what I'm really solving.",
    body: "I start by going beyond the brief. I talk to the client, their team, and when relevant, the people who will eventually build or work with the product. I explore the business, its goals, audience, existing processes and the impact of the problem. Then I research competitors, parallel markets and other industries to understand what already exists, and identify where the opportunities are.",
    keywords: ['Business', 'Stakeholders', 'Users', 'Market', 'Competitors', 'Adjacent Industries'],
  },
  {
    number: '02',
    title: 'DEFINE',
    tagline: 'I turn research into clear challenges.',
    body: 'I identify the real problem, user needs, business goals, constraints and opportunities. Then I continue researching wherever an unanswered question remains.',
    keywords: ['Challenges', 'Pain Points', 'Needs', 'Goals', 'Opportunities', 'Constraints'],
  },
  {
    number: '03',
    title: 'EXPLORE',
    tagline: "I don't jump into the first solution that comes to mind.",
    body: "I collect references from direct competitors and unexpected worlds, sketch ideas by hand, and explore multiple visual and experience directions before committing to one. I look beyond the obvious. Sometimes the best solution for one industry is hiding in a completely different one.",
    keywords: ['References', 'Cross-industry Inspiration', 'Sketches', '3 to 6 Directions', 'Visual Language'],
  },
]

const RADIUS = 128

/* Radial process diagram: three steps orbit a fixed center, slowly auto-rotating.
   Clicking a node stops the rotation and expands a card with the full step
   content below the ring; clicking the same node again (or picking another)
   resumes/switches. Monochrome throughout to match the site's achromatic system
   — this is the same "orbit" concept as typical animated timeline components,
   rebuilt with plain CSS/Framer Motion instead of a shadcn/Next.js stack, since
   this project uses neither. */
export default function ProcessOrbit() {
  const [angle, setAngle] = useState(0)
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (activeIndex !== null) return
    const id = setInterval(() => {
      setAngle((a) => (a + 0.25) % 360)
    }, 50)
    return () => clearInterval(id)
  }, [activeIndex])

  const active = activeIndex !== null ? steps[activeIndex] : null

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[320px] w-[320px]">
        <div className="absolute inset-0 rounded-full border border-line-soft" />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />

        {steps.map((step, i) => {
          const nodeAngle = ((i / steps.length) * 360 + angle) % 360
          const radian = (nodeAngle * Math.PI) / 180
          const x = RADIUS * Math.cos(radian)
          const y = RADIUS * Math.sin(radian)
          const isActive = activeIndex === i

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
              aria-pressed={isActive}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-300 ${
                  isActive ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink'
                }`}
              >
                {step.number}
              </span>
              <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.15em] text-dim">
                {step.title}
              </span>
            </button>
          )
        })}
      </div>

      <div className="relative mt-8 w-full max-w-[380px]">
        <AnimatePresence>
          {active ? (
            <motion.div
              key={active.number}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease }}
              className="border border-line-soft bg-paper p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-dim">{active.number}</p>
              <h4 className="mt-1 font-display text-2xl uppercase leading-none tracking-[0.05em] text-ink">
                {active.title}
              </h4>
              <p className="mt-3 font-sans text-base font-medium leading-snug text-ink">{active.tagline}</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-grey">{active.body}</p>
              <div className="mt-4 border-t border-line-soft pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-dim">What I look into</p>
                <p className="mt-2 font-mono text-sm text-ink">{active.keywords.join(' · ')}</p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="text-center font-mono text-xs uppercase tracking-[0.2em] text-dim"
            >
              Tap a step to explore
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
