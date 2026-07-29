import { useEffect, useRef } from 'react'

/*
 * Plays a <video> only while it's actually in the viewport, pausing it the
 * moment it scrolls out — saves bandwidth/CPU on off-screen video and gives
 * scroll-triggered pacing instead of every video fighting for attention at
 * once on load. play() is wrapped since browsers return a rejecting promise
 * if playback is interrupted before it starts (e.g. a fast scroll past the
 * threshold), which is expected here and not a real error.
 * Also sets `.muted` imperatively on mount: iOS Safari's autoplay gate reads
 * the live DOM property at the moment play() is attempted, and React's
 * `muted` JSX attribute can lose that race — this closes the gap.
 * threshold: 0.25 and rootMargin: '0px' are deliberate, not defaults left
 * over from testing — the previous threshold: 0 + rootMargin: '200px' pair
 * fired as soon as a single pixel entered a zone 200px OUTSIDE the real
 * viewport edges, so videos started playing (and burning through their loop)
 * long before their section was actually on screen, and had often finished a
 * cycle or drifted out of sync by the time the user scrolled to them. A real
 * 25%-visible threshold with no margin expansion means playback starts only
 * once the section is genuinely, substantially in view.
 * Tradeoff: an element taller than ~4x the viewport can structurally never
 * reach a 25% intersection ratio even while fully filling the screen (ratio
 * is capped at viewportHeight/elementHeight). None of this site's
 * in-view-autoplay videos are that tall, so this doesn't apply here — flagging
 * it only so a future far-taller video section doesn't quietly never play.
 */
export default function useInViewAutoplay({ threshold = 0.25, rootMargin = '0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
