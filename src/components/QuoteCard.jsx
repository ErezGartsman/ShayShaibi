import Reveal from './Reveal.jsx'

/* Mobile slider control: small frosted-glass circle over the portrait, one per
   direction. Deliberately delicate — thin ring, translucent fill, thin stroke —
   not a heavy solid disc. Desktop never sees this (md:hidden). */
function SliderArrow({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous interview' : 'Next interview'}
      className={`absolute top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-md transition-colors hover:bg-white/30 md:hidden ${
        dir === 'prev' ? 'left-2' : 'right-2'
      }`}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === 'prev' ? <path d="M10 3L5 8l5 5" /> : <path d="M6 3l5 5-5 5" />}
      </svg>
    </button>
  )
}

/* Verbatim quote + the insight it produced + the Therefore it fed into — one
   self-contained card, per reference research blocks (each interview carries
   its own causal close, not one shared conclusion for the whole section).
   Mobile (below md): slider card — full-width 279px portrait with nav arrows
   over it, quote/tip/therefore stacked beneath.
   Desktop: reference has quote LEFT, image RIGHT — the reverse of mobile's
   image-then-quote DOM order — so this uses md:order-first/md:order-last
   rather than swapping the JSX order, keeping mobile's image-top/quote-bottom
   stacking intact for free (order only affects flex layout, not the DOM).

   Bottom-alignment across the desktop carousel: the image+quote row (not the
   figure itself) carries flex-1, so it — not a justify-between gap — absorbs
   whatever vertical slack a shorter quote leaves inside the row's stretched
   height. That pins every card's meta/tip/therefore block to the same Y,
   regardless of how many lines each quote wraps to. */
export function QuoteCard({
  quote,
  source,
  insight,
  therefore,
  image,
  dimmed = false,
  className = '',
  onPrev,
  onNext,
}) {
  return (
    <Reveal className={className}>
      {/* Dimming lives on the figure, not the Reveal wrapper — the entrance
          animation leaves an inline opacity on the wrapper that would beat
          any class-based opacity set there. md-gated: only the desktop peek
          layout shows neighbors worth fading. */}
      <figure
        className={`flex h-full flex-col gap-4 transition-opacity duration-300 md:gap-8 ${
          dimmed ? 'md:opacity-40' : ''
        }`}
      >
        <div className="flex flex-1 flex-col gap-6 md:max-w-[734px] md:flex-row md:items-start">
          <div className="relative h-[279px] w-full shrink-0 bg-panel md:order-last md:w-[279px]">
            <img src={image} alt="User portrait" className="h-full w-full object-cover" />
            {onPrev && <SliderArrow dir="prev" onClick={onPrev} />}
            {onNext && <SliderArrow dir="next" onClick={onNext} />}
          </div>
          <blockquote className="w-full max-w-full break-words font-mono text-base leading-[1.2] text-ink md:order-first md:text-[24px] md:leading-snug">
            " {quote} "
          </blockquote>
        </div>
        <div>
          <figcaption className="mb-4 font-mono text-[13px] uppercase leading-[1.2] tracking-[0.2em] text-grey md:mb-5">
            {source}
          </figcaption>
          {insight && (
            <p className="flex w-full max-w-full items-start gap-[6px] border-t border-line-soft pt-4 font-sans text-sm leading-[1.2] text-grey break-words md:gap-3 md:pt-5 md:leading-relaxed">
              <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
                <path
                  d="M8 1.5a4.5 4.5 0 0 0-2.5 8.24c.5.36.9.9.9 1.51v.25h3.2v-.25c0-.61.4-1.15.9-1.51A4.5 4.5 0 0 0 8 1.5Z M6.6 13.2h2.8 M7 14.8h2"
                  fill="none"
                  stroke="#101010"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
              {insight}
            </p>
          )}
          {therefore && (
            <div className="mt-4 text-left">
              <p className="mb-1 font-mono text-sm font-bold uppercase tracking-[0.1em] text-ink">
                Therefore
              </p>
              <p className="w-full max-w-full break-words font-sans text-sm leading-relaxed text-grey">{therefore}</p>
            </div>
          )}
        </div>
      </figure>
    </Reveal>
  )
}
