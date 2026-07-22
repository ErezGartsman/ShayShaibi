import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Hash-aware: /#work and /#about smooth-scroll; plain routes reset to top */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        // let the route render before scrolling
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
