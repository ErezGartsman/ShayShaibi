/*
 * Contextual hand-drawn-style marks, one per cause/consequence point.
 * Achromatic, single-stroke look, 90x36 viewBox.
 */
const marks = {
  /* Smartrip causes */
  blackhole: {
    // inward spiral swallowing a stray dot
    paths: [
      'M44 13 C50 11, 53 18, 48 23 C42 28, 34 23, 36 16 C38 11, 45 11, 46 16 C47 20, 42 21, 42 18',
      'M66 8 L56 13',
    ],
    dots: [[70, 7]],
  },
  fragments: {
    // one line broken into drifting segments
    paths: ['M8 24 L26 22', 'M34 20 L50 19', 'M60 17 L74 16'],
    dots: [[30, 21], [55, 18], [80, 15]],
  },
  burden: {
    // a line sagging under a single weight
    paths: ['M10 22 C30 31, 58 31, 80 20'],
    dots: [[45, 24.5]],
    bigDot: true,
  },

  /* Smartrip consequences */
  flatline: {
    // one last heartbeat, then flat
    paths: ['M6 20 L28 20 L34 9 L40 29 L46 20 L84 20'],
    dots: [],
  },
  grind: {
    // relentless sawtooth
    paths: ['M10 27 L20 11 L30 27 L40 11 L50 27 L60 11 L70 27 L80 11'],
    dots: [],
  },
  copies: {
    // three identical stops, the original crossed out
    paths: ['M76 16 L84 24', 'M84 16 L76 24'],
    circles: [[20, 20], [40, 20], [60, 20]],
    dots: [],
  },

  /* NEXUS causes */
  switch: {
    // a rail with only two states: on, off
    paths: ['M10 20 L20 20', 'M36 20 L54 20', 'M70 20 L80 20'],
    circles: [[62, 20]],
    dots: [[28, 20]],
    bigDot: true,
  },
  norewind: {
    // rewind arrow, struck through
    paths: ['M72 24 C52 8, 30 8, 16 20', 'M16 20 L25 14', 'M16 20 L26 24', 'M40 5 L54 31'],
    dots: [],
  },
  tangle: {
    // logic that knots on itself
    paths: [
      'M10 22 C20 8, 34 8, 38 18 C42 28, 28 30, 27 22 C26 14, 44 10, 52 16 C58 21, 52 27, 47 23',
      'M52 16 C62 11, 72 14, 80 11',
    ],
    dots: [],
  },

  /* NEXUS consequences */
  burst: {
    // the send that detonates
    paths: ['M34 12 L58 12 L58 26 L34 26 Z', 'M34 12 L46 21 L58 12', 'M26 8 L20 4', 'M26 19 L18 19', 'M66 8 L72 4', 'M66 19 L74 19'],
    dots: [],
  },
  alert: {
    // the reply nobody wants, echoing
    paths: ['M45 7 L45 19', 'M35 9 C32 13, 32 20, 35 24', 'M55 9 C58 13, 58 20, 55 24'],
    dots: [[45, 26]],
  },
  sweep: {
    // cleanup, stroke by stroke
    paths: ['M14 8 L52 22', 'M52 22 L60 31', 'M52 22 L66 27', 'M52 22 L69 21'],
    dots: [[76, 30], [80, 23]],
  },
}

export default function Doodle({ name, className = '' }) {
  const m = marks[name] || marks.fragments
  return (
    <svg viewBox="0 0 90 36" className={`h-9 w-24 ${className}`} aria-hidden="true">
      {m.paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#101010" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {(m.circles || []).map(([cx, cy], i) => (
        <circle key={`c${i}`} cx={cx} cy={cy} r="5" fill="none" stroke="#101010" strokeWidth="1.6" />
      ))}
      {(m.dots || []).map(([cx, cy], i) => (
        <circle key={`d${i}`} cx={cx} cy={cy} r={m.bigDot ? 3.4 : 1.9} fill="#101010" />
      ))}
    </svg>
  )
}
