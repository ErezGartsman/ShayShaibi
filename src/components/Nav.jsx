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

  /* Homepage frost is scroll-gated: transparent at the very top so the hero
     shows through, frosted once the user scrolls past it. No-op on project
     pages (frosted from load regardless). */
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* EVERYTHING below is mobile/tablet only. Desktop (lg:) is restored to its
     original untouched behaviour by lg: classes on the header/nav (blend on the
     HEADER, translateZ hint, white text) and by lg:hidden on the frost layer —
     none of the mobile layering reaches lg+.
     Mobile homepage nav text:
     - at the very top (not scrolled): text-ink, a DETERMINISTIC dark — not
       relying on mix-blend-difference happening to invert white→black over the
       light hero (which was rendering as plain white for real iOS Safari).
     - once scrolled: text-white + mix-blend-difference, so it inverts on its
       own — dark over the light About section, white over the dark project
       videos.
     Mobile project pages: solid white (their one dark hero + frosted bar needs
     no inversion).
     Frosted bar AND the blend coexist because they're layered: the blur is on
     its own absolutely-positioned frost <div> behind the text, the text carries
     the blend on top — separate compositing subtrees. For the nav-level blend
     to reach the page the mobile header must NOT be isolated, so the translateZ
     compositing hint lives on the frost layer (where the backdrop-filter is),
     not the header. */
  const isProjectPage = pathname.startsWith('/projects')
  const frostVisible = isProjectPage || isScrolled
  /* max-lg: on every mobile text class so it CANNOT leak into desktop. An
     unprefixed text-ink here was outranking the nav's lg:text-white at lg+
     (equal specificity, and the base utility won), flipping the desktop text
     colour. Scoping the mobile state to max-lg: leaves lg+ purely to the
     lg:text-white / lg:mix-blend-normal desktop classes. */
  const mobileNavText = isProjectPage
    ? 'max-lg:text-white'
    : isScrolled
      ? 'max-lg:text-white max-lg:mix-blend-difference'
      : 'max-lg:text-ink'
  const frostLayerClass = frostVisible
    ? 'bg-black/5 backdrop-blur-md border-white/10'
    : 'bg-transparent backdrop-blur-none border-transparent'

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
      {/* Mobile/tablet: the header is a bare transparent, NON-isolated box so
          the nav's mix-blend-difference can reach the page (an isolating
          ancestor would trap it — the old "mobile text stuck white" bug).
          Desktop (lg:) is the ORIGINAL, untouched treatment, restored verbatim:
          translateZ + backface compositing hints, transparent bg/blur/border,
          and mix-blend-difference ON THE HEADER (not the nav). Because these are
          all lg:-scoped, none of the mobile layering leaks into desktop. */}
      <header
        id="site-header"
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out lg:[transform:translateZ(0)] lg:[backface-visibility:hidden] lg:bg-transparent lg:backdrop-blur-none lg:border-transparent lg:mix-blend-difference"
      >
        {/* Frosted-glass layer — MOBILE/TABLET ONLY (lg:hidden). Its own
            compositing subtree (backdrop-filter + translateZ + backface) sitting
            behind the nav text at -z-10 so the blur and the text's
            mix-blend-difference never collide. Scroll-gated on the homepage,
            always-on for project pages. Removed entirely at lg+, so desktop has
            no frost layer at all — exactly as before. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 border-b transition-all duration-300 ease-in-out [transform:translateZ(0)] [backface-visibility:hidden] lg:hidden ${frostLayerClass}`}
        />
        {/* lg:mix-blend-normal turns the mobile nav-level blend OFF at desktop,
            where the blend lives on the header instead (original behaviour). */}
        <nav
          className={`flex items-center justify-between px-6 py-6 sm:px-10 transition-colors duration-300 lg:text-white lg:mix-blend-normal ${mobileNavText}`}
        >
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative z-10 font-display leading-none tracking-[0.2em]"
            style={{ fontSize: 40 }}
          >
            SHAY
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
              width difference between the fallback font and the real one for this text).
              top-[22px], not top-4: the SHAY logo is 40px tall (leading-none) inside the nav's
              py-6 (24px) padding, so its vertical center sits at 24+20=44px from the header's
              top edge. This button is 44px tall (min-h-[44px]), so centering IT on that same
              44px mark means its own top has to start at 44-22=22px, not the nav's raw
              padding value — those aren't the same number since the two elements aren't the
              same height. */}
          <button
            onClick={() => setMenuOpen(true)}
            className="fixed right-4 top-[22px] z-50 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-[20px] leading-[24px] font-light tracking-[0.2px] normal-case lg:hidden"
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
                SHAY
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
              Kfar Tavor, Israel / UTC+3
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onClose={closeContact} />
    </>
  )
}