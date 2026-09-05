import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useFocusTrap from '../hooks/useFocusTrap.js'

const ease = [0.22, 1, 0.36, 1]

/* Full, uncropped image reveal: the grid thumbnails are object-cover (cropped
   to fit their fixed box), so clicking through shows the real image at its
   own aspect ratio (object-contain) instead. */
export default function ImageLightbox({ open, onClose, src, alt }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useFocusTrap(open, panelRef, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 px-6 py-16"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease }}
            className="relative max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={src} alt={alt} className="max-h-[80vh] max-w-full object-contain" />
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-10 right-0 flex min-h-[44px] items-center font-mono text-xs uppercase tracking-[0.1em] text-paper transition-opacity hover:opacity-60"
            >
              [ Close ]
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
