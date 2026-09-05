import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const steps = [
  {
    number: '01',
    title: 'INVESTIGATE',
    tagline: 'Understand before deciding.',
    body: "I go beyond the brief to understand the business, the people behind it, the users, the market, and the context surrounding the problem.",
    keywords: ['Stakeholder conversations', 'User research', 'Market research', 'Competitor analysis', 'Adjacent markets', 'Team & workflow'],
  },
  {
    number: '02',
    title: 'DEFINE',
    tagline: 'Turn research into the right questions.',
    body: "I translate what I've learned into clear challenges, needs, goals, constraints, and opportunities, and keep researching wherever something still doesn't make sense.",
    keywords: ['Problem definition', 'Pain points', 'User needs', 'Business goals', 'Constraints', 'Opportunities'],
  },
  {
    number: '03',
    title: 'EXPLORE',
    tagline: 'Look beyond the obvious.',
    body: "I explore multiple directions before committing to one, from direct competitors to completely different worlds that might hold a better idea. I sketch by hand, collect references, and develop several possible directions before narrowing them down with the client. Some of my best references come from gaming, luxury, entertainment, and other industries that have nothing to do with the brief.",
    keywords: ['Inspiration', 'Hand sketches', 'Cross-industry research', 'Visual directions', '3 to 6 concepts'],
  },
  {
    number: '04',
    title: 'STRUCTURE',
    tagline: 'Make it work before making it pretty.',
    body: "Once the direction is clear, I build the experience from the inside out. I map the journey, organize the information, define the flows, and create low-fidelity wireframes before touching the final UI.",
    keywords: ['User flows', 'Information architecture', 'Sitemap', 'Low-fi wireframes', 'Interaction logic'],
  },
  {
    number: '05',
    title: 'DESIGN',
    tagline: 'Turn the system into an experience.',
    body: "With the structure in place, I develop the visual language, build the design system, and turn the experience into a polished, consistent interface. Whether I'm working in Figma or building with AI-assisted tools, I define the system first so the experience stays consistent as it grows.",
    keywords: ['Visual language', 'Design system', 'Components', 'Typography', 'UI', 'Interactive prototype'],
  },
  {
    number: '06',
    title: 'VALIDATE',
    tagline: 'Test. Learn. Change. Repeat.',
    body: "I put the prototype in front of real users and give them tasks instead of explaining how the product should work. Where do they hesitate? What do they misunderstand? What can't they find? Those moments become the next iteration. Validating isn't approving. It's what sends me back to refine the structure and the design.",
    keywords: ['Usability testing', 'Task-based testing', 'Accessibility', 'Feedback', 'Iteration', 'Prototype refinement'],
  },
  {
    number: '07',
    title: 'DELIVER',
    tagline: 'Stay involved until it works.',
    body: "I don't consider a folder or a handoff document the end of my job. I sit with developers, explain the decisions behind the experience, answer questions, review the implementation, and make sure the final product stays true to the design.",
    keywords: ['Developer handoff', '1:1 collaboration', 'Specs', 'Design QA', 'Implementation review'],
  },
]

/* Both expressed as % of the container's own width/height, not fixed pixels, so
   the ring and every node stay correctly proportioned (nodes exactly ON the
   ring line) no matter how wide this component's grid column actually renders
   between the lg breakpoint and a wide desktop screen. */
const RING_SIZE_PCT = 74
const NODE_RADIUS_PCT = RING_SIZE_PCT / 2

/* Radial process diagram: seven steps orbit a fixed center, slowly auto-rotating.
   With seven items, permanent text labels under each node would collide with
   each other at narrower desktop widths, so the ring itself only carries the
   step numbers (plus a native tooltip + aria-label), and the full title only
   appears once a node is active, in the card below the ring. Clicking a node
   stops the rotation and shows its full content; clicking the same node again
   (or picking another) resumes/switches. Monochrome throughout to match the
   site's achromatic system: this is the same "orbit" concept as typical
   animated timeline components, rebuilt with plain CSS/Framer Motion instead
   of a shadcn/Next.js stack, since this project uses neither. */
export default function ProcessOrbit() {
  const [angle, setAngle] = useState(0)
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (activeIndex !== null) return
    const id = setInterval(() => {
      setAngle((a) => (a + 0.2) % 360)
    }, 50)
    return () => clearInterval(id)
  }, [activeIndex])

  const active = activeIndex !== null ? steps[activeIndex] : null

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-[380px]">
        <div className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-soft" style={{ width: `${RING_SIZE_PCT}%` }} />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />

        {steps.map((step, i) => {
          const nodeAngle = ((i / steps.length) * 360 + angle) % 360
          const radian = (nodeAngle * Math.PI) / 180
          const xPct = NODE_RADIUS_PCT * Math.cos(radian)
          const yPct = NODE_RADIUS_PCT * Math.sin(radian)
          const isActive = activeIndex === i

          return (
            <button
              key={step.number}
              type="button"
              title={step.title}
              aria-label={`${step.number} ${step.title}`}
              aria-pressed={isActive}
              onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + xPct}%`, top: `${50 + yPct}%` }}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-300 ${
                  isActive ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink'
                }`}
              >
                {step.number}
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
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-dim">What happens here</p>
                <p className="mt-2 font-mono text-sm text-ink">{active.keywords.join(' · ')}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="text-center"
            >
              <p className="font-sans text-base font-medium leading-snug text-ink">Design is never really done.</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-grey">
                The process keeps moving. Every release creates new questions, new insights, and another opportunity to improve.
              </p>
              <p className="mt-3 font-mono text-sm text-dim">/</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-grey">
                There is always something more to understand and something better to build.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
