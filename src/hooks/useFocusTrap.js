import { useEffect } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/*
 * Traps keyboard focus inside a container while `active` is true:
 * focuses the first focusable on open, cycles Tab/Shift+Tab within the
 * container, closes on Escape, and restores focus to the opener on close.
 */
export default function useFocusTrap(active, containerRef, onClose) {
  useEffect(() => {
    if (!active) return
    const opener = document.activeElement
    containerRef.current?.querySelector(FOCUSABLE)?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
        return
      }
      if (e.key !== 'Tab') return
      const items = containerRef.current?.querySelectorAll(FOCUSABLE)
      if (!items?.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      opener?.focus?.()
    }
  }, [active, containerRef, onClose])
}
