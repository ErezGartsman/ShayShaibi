/*
 * Rolling hover text, replicating the reference's text-shadow trick:
 * each character carries a shadow copy of itself 1.2em below, the line is
 * clipped with overflow-hidden, and on hover every character translates up
 * by 1.2em with a tiny sequential delay so the label "rolls".
 *
 * The parent element must have the `group` class.
 */
export default function RollingText({ text }) {
  return (
    <span className="inline-flex overflow-hidden leading-[1.2]" aria-label={text}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          // הורדנו ל-500 והחזרנו ל-ease-out לתנועה קריספית יותר
          className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-[1.2em]"
          // הורדנו ל-30ms כדי שהגל ירוץ קצת יותר מהר
          style={{ textShadow: '0 1.2em currentColor', transitionDelay: `${i * 30}ms` }}
        >
          {ch === ' ' ? '\u00A0' : ch} 
        </span>
      ))}
    </span>
  )
}