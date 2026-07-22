import Reveal from './Reveal.jsx'

/*
 * Placeholder for a full-bleed video or image.
 * tone="light" = grey panel on paper; tone="dark" = near-black media block.
 * Swap the outer <div> for <img>/<video> when real assets arrive.
 */
export default function MediaPlaceholder({ label, ratio = 'aspect-[16/9]', tone = 'light', className = '' }) {
  return (
    <Reveal className={className}>
      <div
        className={`relative w-full ${ratio} ${tone === 'dark' ? 'bg-dark' : 'bg-panel'}`}
        role="img"
        aria-label={label}
      >
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <p
            className={`text-center font-mono text-[13px] uppercase tracking-[0.25em] ${
              tone === 'dark' ? 'text-white/30' : 'text-dim'
            }`}
          >
            [ {label} ]
          </p>
        </div>
      </div>
    </Reveal>
  )
}
