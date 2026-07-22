import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'

const ease = [0.22, 1, 0.36, 1]

const channels = [
  ['Email', 'erezkim1234@gmail.com', 'mailto:erezkim1234@gmail.com'],
  ['LinkedIn', 'in/erezgartsman', 'https://www.linkedin.com/in/erezgartsman/'],
  ['GitHub', 'ErezGartsman', 'https://github.com/ErezGartsman'],
  ['CV', 'Erez-Gartsman-CV.pdf', '/Erez-Gartsman-CV.pdf'],
]

export default function Contact() {
  return (
    <section className="flex min-h-[85vh] flex-col justify-center px-6 pb-16 pt-32 sm:px-10">
      <motion.p
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease }}
        className="font-display text-2xl uppercase leading-none tracking-[0.2em] text-ink sm:text-3xl"
      >
        Get in touch
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
        className="mt-10 font-display text-[clamp(4rem,14vw,11rem)] uppercase leading-none tracking-[-0.01em] text-ink"
      >
        Let's talk
      </motion.h1>

      <Reveal className="mt-8">
        <p className="max-w-md font-mono text-lg leading-relaxed text-grey">
          Product roles, collaborations, or a hard problem worth solving.
          Email gets the fastest answer.
        </p>
      </Reveal>

      <Reveal className="mt-16">
        <div className="border-t border-line-soft">
          {channels.map(([label, value, href]) => (
            <a
              key={label}
              href={href}
              download={label === 'CV' ? 'Erez-Gartsman-CV.pdf' : undefined}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col justify-between gap-1 border-b border-line-soft py-7 transition-opacity hover:opacity-60 sm:flex-row sm:items-baseline"
            >
              <span className="font-mono text-base text-ink">[ {label} ]</span>
              <span className="font-mono text-base text-grey">{value} ↗</span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-dim">
          Hadera, Israel / UTC+3
        </p>
      </Reveal>
    </section>
  )
}
