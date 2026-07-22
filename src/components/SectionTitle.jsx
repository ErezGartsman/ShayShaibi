import Reveal from './Reveal.jsx'

/*
 * Slash-prefixed section title, Anton SC with wide tracking.
 * Case-study sections center it; page sections keep it left.
 */
export default function SectionTitle({ children, align = 'center' }) {
  return (
    <Reveal>
      <h2
        className={`font-display text-[20px] font-normal uppercase leading-[24px] tracking-[8px] text-[#101010] ${
          align === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        <span className="mr-4">/</span>
        {children}
      </h2>
    </Reveal>
  )
}
