import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import RollingText from './RollingText.jsx'
import ContactModal from './ContactModal.jsx'
import useFocusTrap from '../hooks/useFocusTrap.js'

const ease = [0.22, 1, 0.36, 1]

/* Brackets stay static; only the words roll on hover */
function BracketLabel({ text }) {
  return (
    <>
      <span aria-hidden="true">[ </span>
      <RollingText text={text} />
      <span aria-hidden="true"> ]</span>
    </>
  )
}

const mobileLinks = [
  ['[ MY WORK ]', '/#work'],
  ['[ ABOUT ME ]', '/#about'],
  ['[ GET IN TOUCH ]', '#footer'],
]

export default function Nav() {
  const [contactOpen, setContactOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const overlayRef = useRef(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const closeContact = useCallback(() => setContactOpen(false), [])

  useEffect(() => setMenuOpen(false), [pathname, hash])

  /* Scroll lock while the overlay is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* Tab/Shift+Tab stay inside the overlay; Escape closes; focus returns to the toggle */
  useFocusTrap(menuOpen, overlayRef, closeMenu)

  return (
    <>
      {/* Mobile glass restored to its true original — bg-white/25 backdrop-blur-md,
          the very first background this header ever had, from before this whole
          nav saga started. (bg-black/15, introduced later in that same saga as a
          first-pass fix, was NOT this; it just happened to be what was in place
          right before the bg-ink/60 mistake, which is as far back as "revert"
          could reasonably be read a few turns ago.) Desktop stays fully
          transparent, unchanged.
          What's deliberately NOT restored alongside it: the original pairing was
          text-ink + mix-blend-normal, which is the actual bug that started this
          saga — dark text is invisible over a dark hero video. mix-blend-difference
          (kept here, uniform across breakpoints) is the real fix for that, and
          works fine layered under any background, light or none, so both goals
          — the original delicate glass AND correct text contrast everywhere —
          hold at once.
          Compositing hints unchanged: translateZ(0) + backface-visibility: hidden
          keep this fixed+blended element on its own GPU layer, which is what
          stops it from visibly clipping/detaching during momentum scroll on
          mobile. Still not using isolation: isolate — that would contain the
          blend to this subtree and stop the text from inverting against the
          page scrolling underneath, breaking the effect entirely. */}
      <header
        id="site-header"
        className="fixed inset-x-0 top-0 z-50 bg-black/15 backdrop-blur-xs mix-blend-difference [transform:translateZ(0)] [backface-visibility:hidden] lg:bg-transparent lg:backdrop-blur-none"
      >
        <nav className="flex items-center justify-between px-6 py-6 text-white sm:px-10">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative z-10 font-display leading-none tracking-[0.2em]"
            style={{ fontSize: 40 }}
          >
            EG
          </Link>

          {/* Desktop (hamburger persists through the tablet range): exact 16px / 300 / 0.8px */}
          <div
            className="hidden items-center gap-12 font-mono uppercase lg:flex"
            style={{ fontSize: 16, fontWeight: 300, letterSpacing: '0.8px' }}
          >
            <Link to="/#work" className="group whitespace-nowrap">
              <BracketLabel text="MY WORK" />
            </Link>
            <Link to="/#about" className="group whitespace-nowrap">
              <BracketLabel text="ABOUT ME" />
            </Link>
            <a href="#footer" className="group whitespace-nowrap">
              <BracketLabel text="GET IN TOUCH" />
            </a>
          </div>

          {/* Desktop: Contact Me Button with 30x30 Hover Arrow */}
          <button
            onClick={() => setContactOpen(true)}
            className="rule-link hidden group cursor-pointer font-mono uppercase transition-all duration-200 hover:opacity-80 active:scale-95 lg:inline-flex items-center"
            style={{ fontSize: 16, letterSpacing: '0.8px' }}
          >
            Contact me
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] ml-1.5 text-[30px] leading-none transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </button>

          {/* Mobile/tablet: menu toggle, self-positioned via fixed+top+right rather than the
              nav's flex/justify-between — its final position no longer depends on the parent
              nav's flex CSS having loaded, only on these two inset values (also mirrored in
              index.html's critical CSS). Position alone isn't the whole fix, though: 'Nav Mono'
              (index.html) is a dedicated font-display: optional face for this exact file, so the
              label never does the swap Spline Sans Mono's own font-display: swap guarantees —
              that swap, not a positioning gap, was the real source of the "jump" (measured ~8px
              width difference between the fallback font and the real one for this text). */}
          <button
            onClick={() => setMenuOpen(true)}
            className="fixed right-4 top-4 z-50 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-[20px] leading-[24px] font-light tracking-[0.2px] normal-case lg:hidden"
            style={{ fontFamily: "'Nav Mono', ui-monospace, monospace" }}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
          >
            [ Menu ]
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={overlayRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-paper px-6 pb-12 pt-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-4xl leading-none tracking-[0.2em] text-ink">
                EG
              </span>
              <button
                onClick={closeMenu}
                className="-m-2 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 font-mono text-base text-ink"
                style={{ letterSpacing: '0.8px' }}
              >
                [ Close ]
              </button>
            </div>

            <nav className="mt-20 flex flex-col gap-8">
              {mobileLinks.map(([label, to], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, ease, delay: 0.1 + i * 0.08 }}
                >
                  {to.startsWith('/') ? (
                    <Link
                      to={to}
                      onClick={closeMenu}
                      className="flex min-h-[44px] items-center font-mono text-[clamp(1.5rem,8.4vw,1.875rem)] uppercase tracking-[0.02em] text-ink"
                    >
                      {label}
                    </Link>
                  ) : (
                    <a
                      href={to}
                      onClick={closeMenu}
                      className="flex min-h-[44px] items-center font-mono text-[clamp(1.5rem,8.4vw,1.875rem)] uppercase tracking-[0.02em] text-ink"
                    >
                      {label}
                    </a>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease, delay: 0.34 }}
              >
                {/* Mobile: Contact Me Button with 30x30 Hover Arrow */}
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    setContactOpen(true)
                  }}
                  className="flex min-h-[44px] items-center group active:scale-95 transition-transform duration-200"
                >
                  <span className="rule-link font-mono text-[clamp(1.5rem,8.4vw,1.875rem)] uppercase tracking-[0.02em] text-ink flex items-center">
                    Contact me
                    <span className="inline-flex items-center justify-center w-[30px] h-[30px] ml-2 text-[30px] leading-none transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </span>
                </button>
              </motion.div>
            </nav>

            <p className="mt-auto font-mono text-[13px] uppercase tracking-[0.25em] text-dim">
              Hadera, Israel / UTC+3
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onClose={closeContact} />
    </>
  )
}