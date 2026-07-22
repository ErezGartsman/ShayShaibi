import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import CaseStudy from './pages/CaseStudy.jsx'

export default function App() {
  const { pathname } = useLocation()

  return (
    // reducedMotion="user": transform/slide animations are dropped for
    // prefers-reduced-motion users; opacity fades still run
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-paper text-ink">
        <ScrollToTop />
        <Nav />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {/* Keyed by route so the typewriter re-arms on every page */}
        <Footer key={pathname} />
      </div>
    </MotionConfig>
  )
}
