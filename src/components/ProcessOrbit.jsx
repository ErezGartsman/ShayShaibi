import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { Search, Target, Compass, LayoutGrid, PenTool, FlaskConical, Rocket } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const steps = [
  {
    number: '01',
    title: 'INVESTIGATE',
    icon: Search,
    tagline: 'Understand before deciding.',
    body: "I go beyond the brief to understand the business, the people behind it, the users, the market, and the context surrounding the problem.",
    keywords: ['Stakeholder conversations', 'User research', 'Market research', 'Competitor analysis', 'Adjacent markets', 'Team & workflow'],
  },
  {
    number: '02',
    title: 'DEFINE',
    icon: Target,
    tagline: 'Turn research into the right questions.',
    body: "I translate what I've learned into clear challenges, needs, goals, constraints, and opportunities, and keep researching wherever something still doesn't make sense.",
    keywords: ['Problem definition', 'Pain points', 'User needs', 'Business goals', 'Constraints', 'Opportunities'],
  },
  {
    number: '03',
    title: 'EXPLORE',
    icon: Compass,
    tagline: 'Look beyond the obvious.',
    body: "I explore multiple directions before committing to one, from direct competitors to completely different worlds that might hold a better idea. I sketch by hand, collect references, and develop several possible directions before narrowing them down with the client. Some of my best references come from gaming, luxury, entertainment, and other industries that have nothing to do with the brief.",
    keywords: ['Inspiration', 'Hand sketches', 'Cross-industry research', 'Visual directions', '3 to 6 concepts'],
  },
  {
    number: '04',
    title: 'STRUCTURE',
    icon: LayoutGrid,
    tagline: 'Make it work before making it pretty.',
    body: "Once the direction is clear, I build the experience from the inside out. I map the journey, organize the information, define the flows, and create low-fidelity wireframes before touching the final UI.",
    keywords: ['User flows', 'Information architecture', 'Sitemap', 'Low-fi wireframes', 'Interaction logic'],
  },
  {
    number: '05',
    title: 'DESIGN',
    icon: PenTool,
    tagline: 'Turn the system into an experience.',
    body: "With the structure in place, I develop the visual language, build the design system, and turn the experience into a polished, consistent interface. Whether I'm working in Figma or building with AI-assisted tools, I define the system first so the experience stays consistent as it grows.",
    keywords: ['Visual language', 'Design system', 'Components', 'Typography', 'UI', 'Interactive prototype'],
  },
  {
    number: '06',
    title: 'VALIDATE',
    icon: FlaskConical,
    tagline: 'Test. Learn. Change. Repeat.',
    body: "I put the prototype in front of real users and give them tasks instead of explaining how the product should work. Where do they hesitate? What do they misunderstand? What can't they find? Those moments become the next iteration. Validating isn't approving. It's what sends me back to refine the structure and the design.",
    keywords: ['Usability testing', 'Task-based testing', 'Accessibility', 'Feedback', 'Iteration', 'Prototype refinement'],
  },
  {
    number: '07',
    title: 'DELIVER',
    icon: Rocket,
    tagline: 'Stay involved until it works.',
    body: "I don't consider a folder or a handoff document the end of my job. I sit with developers, explain the decisions behind the experience, answer questions, review the implementation, and make sure the final product stays true to the design.",
    keywords: ['Developer handoff', '1:1 collaboration', 'Specs', 'Design QA', 'Implementation review'],
  },
]

/* Both expressed as % of the container's own width/height, not fixed pixels, so
   the ring and every node stay correctly proportioned (nodes exactly ON the
   ring line) no matter how wide this component's grid column actually renders
   between the lg breakpoint and a wide desktop screen. */
const RING_SIZE_PCT = 74
const NODE_RADIUS_PCT = RING_SIZE_PCT / 2
/* Where "top of the ring" sits, and where the active card anchors under it. */
const TOP_PCT = 50 - NODE_RADIUS_PCT

/* Shortest angular path from `current` to an angle equivalent to `target`
   (mod 360), so animating between them always sweeps the short way round the
   ring instead of potentially spinning almost a full turn backward. */
function shortestAngleTo(current, target) {
  const diff = (((target - current) % 360) + 540) % 360 - 180
  return current + diff
}

/* Radial process diagram: seven steps orbit a fixed center, slowly auto-rotating.
   Clicking a node spins the ring (animating the angle itself, not the node's
   raw left/top, so it sweeps the arc instead of cutting a straight line across
   the circle) until that node reaches the top, then anchors its full card
   right there with a short connector line — clicking the same node again (or
   picking another) resumes/retargets the rotation. Monochrome throughout to
   match the site's achromatic system: this is the same "orbit" concept as
   typical animated timeline components, rebuilt with plain CSS/Framer Motion
   instead of a shadcn/Next.js stack, since this project uses neither. */
export default function ProcessOrbit() {
  const [angle, setAngle] = useState(0)
  const [activeIndex, setActiveIndex] = useState(null)
  const angleRef = useRef(0)
  const animationRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    angleRef.current = angle
  }, [angle])

  useEffect(() => {
    if (activeIndex !== null) return
    const id = setInterval(() => {
      setAngle((a) => (a + 0.2) % 360)
    }, 50)
    return () => clearInterval(id)
  }, [activeIndex])

  /* Clicking anywhere outside the diagram (the rest of the page) closes
     whichever card is open, same as clicking its own node again. */
  useEffect(() => {
    if (activeIndex === null) return
    const handleOutsideClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setActiveIndex(null)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [activeIndex])

  const handleSelect = (i) => {
    animationRef.current?.stop()

    if (activeIndex === i) {
      setActiveIndex(null)
      return
    }

    const rawTarget = 270 - (i / steps.length) * 360
    const target = shortestAngleTo(angleRef.current, rawTarget)
    setActiveIndex(i)
    animationRef.current = animate(angleRef.current, target, {
      duration: 0.7,
      ease,
      onUpdate: (v) => setAngle(v),
    })
  }

  const active = activeIndex !== null ? steps[activeIndex] : null

  return (
    <div ref={rootRef} className="flex w-full flex-col items-center">
      <p className="mb-8 text-center font-sans text-base font-medium leading-snug text-ink">
        Design is never really done.
      </p>

      <div className="relative aspect-square w-full max-w-[480px]">
        <div
          className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-soft"
          style={{ width: `${RING_SIZE_PCT}%` }}
        />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />

        {steps.map((step, i) => {
          const nodeAngle = ((i / steps.length) * 360 + angle) % 360
          const radian = (nodeAngle * Math.PI) / 180
          const xPct = NODE_RADIUS_PCT * Math.cos(radian)
          const yPct = NODE_RADIUS_PCT * Math.sin(radian)
          const isActive = activeIndex === i
          const Icon = step.icon

          return (
            <button
              key={step.number}
              type="button"
              title={step.title}
              aria-label={step.title}
              aria-pressed={isActive}
              onClick={() => handleSelect(i)}
              className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-opacity duration-300"
              style={{
                left: `${50 + xPct}%`,
                top: `${50 + yPct}%`,
                zIndex: isActive ? 20 : 10,
                opacity: activeIndex !== null && !isActive ? 0.35 : 1,
              }}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_18px_rgba(0,0,0,0.15)] ${
                  isActive
                    ? 'border-ink bg-ink text-paper shadow-[0_6px_18px_rgba(0,0,0,0.15)]'
                    : 'border-line bg-paper text-ink group-hover:border-ink'
                }`}
              >
                <Icon size={22} strokeWidth={1.5} />
              </span>
            </button>
          )
        })}

        <AnimatePresence>
          {active && (
            <motion.div
              key={active.number}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease } }}
              transition={{ duration: 0.4, ease, delay: 0.45 }}
              className="absolute left-1/2 z-30 w-[min(90%,340px)] -translate-x-1/2"
              style={{ top: `calc(${TOP_PCT}% + 40px)` }}
            >
              <div className="mx-auto h-3 w-px bg-line" />
              <div className="scroll-thin max-h-[260px] overflow-y-auto border border-line-soft bg-paper p-6 shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
