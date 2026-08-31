import { motion } from 'framer-motion'
import RollingText from './RollingText.jsx'

const ease = [0.22, 1, 0.36, 1]

const links = [
  ['Email Address', 'mailto:shayshaibi355@gmail.com'],
  ['Call Me', 'tel:+972542263500'],
]

/* Dramatic left-to-right typewriter: SHAY resolves first, then SHAIBI */
const lines = ['Shay', 'Shai', 'bi']
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
}
const letter = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.05 } },
}

function TypeName() {
  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="font-display uppercase leading-[0.82] tracking-[-0.01em] text-ink"
      aria-label="Shay Shaibi"
    >
      {lines.map((line) => (
        <span key={line} className="block text-[clamp(3.5rem,9vw,7.5rem)]">
          {[...line].map((ch, i) => (
            <motion.span key={i} variants={letter} className="inline-block" aria-hidden="true">
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.p>
  )
}

export default function Footer() {
  return (
    <footer id="footer" className="relative z-10 bg-paper">
      <div className="grid items-end gap-8 px-6 pb-10 pt-12 md:pt-6 sm:px-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <TypeName />

        <div className="flex flex-col items-start gap-6 lg:items-end lg:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease, delay: 0.4 }}
            className="text-left font-display text-[clamp(1.5rem,3.4vw,2.6rem)] uppercase leading-none tracking-[0.12em] text-ink lg:text-right"
          >
            let’s innovate together
          </motion.p>
          
          {/* שינוי 2: שינינו את הרווח בין הלינקים מ-gap-2 ל-gap-0 כדי להדק אותם לגמרי במובייל */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease, delay: 0.6 }}
            className="flex flex-col items-start gap-0 font-mono text-base uppercase text-ink lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-x-12 lg:gap-y-5"
          >
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                /* שינוי 3: הסרנו את min-h-[44px] למובייל, והוספנו py-1 לריווח עדין */
                className="group inline-flex py-1 md:min-h-[44px] items-center"
              >
                {/* שינוי 4: הוספנו &nbsp; כדי להכריח את הדפדפן להציג רווח יוקרתי בסוגריים */}
                <span aria-hidden="true">[&nbsp;</span>
                <RollingText text={label.toUpperCase()} />
                <span aria-hidden="true">&nbsp;]</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
