import { motion, useReducedMotion } from 'framer-motion'

/*
 * Scroll-triggered reveal: slides up into clarity.
 * amount: 0.5 = the block must actually be half-visible before it animates,
 * so nothing fires early; slower duration for a calmer, documentary pace.
 * Reduced motion: no slide/blur, just a quick fade to full opacity.
 * duration/ease: optional per-usage overrides (default matches the site-wide 1.15s/
 * documentary ease so every existing call site is unaffected unless it opts in).
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  amount = 0.5,
  duration = 1.15,
  ease = [0.22, 1, 0.36, 1],
}) {
  const Tag = motion[as] || motion.div
  const reduceMotion = useReducedMotion()
  return (
    <Tag
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36, filter: 'blur(10px)' }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduceMotion ? 0.25 : duration,
        ease,
        delay: reduceMotion ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </Tag>
  )
}
