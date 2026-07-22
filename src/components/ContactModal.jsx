import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import useFocusTrap from '../hooks/useFocusTrap.js'

const ease = [0.22, 1, 0.36, 1]

/* Sibling to the row's <a>, not nested inside it, so its hover state stays
   its own instead of inheriting the link's. Briefly swaps to a checkmark to
   confirm the copy landed. */
function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), 2000)
      }}
      aria-label={label}
      className="cursor-pointer text-grey transition-colors hover:text-ink"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  )
}

/* Minimalist achromatic contact chooser: email or call */
export default function ContactModal({ open, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /* Escape closes; Tab cycles inside the panel; focus returns to the opener */
  useFocusTrap(open, panelRef, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 px-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Contact options"
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease }}
            className="w-full max-w-md bg-paper p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-10 flex items-baseline justify-between">
              <p className="font-display text-2xl uppercase tracking-[0.15em] text-ink">
                Contact me
              </p>
              <button
                onClick={onClose}
                className="-m-3 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center p-3 font-mono text-sm uppercase tracking-[0.1em] text-grey transition-colors hover:text-ink"
              >
                [ Close ]
              </button>
            </div>

            <div className="border-t border-line-soft">
              <div className="flex items-baseline justify-between border-b border-line-soft py-7">
                <span className="font-mono text-lg uppercase tracking-[0.06em] text-ink">
                  Email me
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href="mailto:erezkim1234@gmail.com"
                    className="font-mono text-sm text-grey transition-opacity hover:opacity-60"
                  >
                    erezkim1234@gmail.com
                  </a>
                  <CopyButton value="erezkim1234@gmail.com" label="Copy email address" />
                </div>
              </div>
              <div className="flex items-baseline justify-between border-b border-line-soft py-7">
                <span className="font-mono text-lg uppercase tracking-[0.06em] text-ink">
                  Call me
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href="tel:+972546150955"
                    className="font-mono text-sm text-grey transition-opacity hover:opacity-60"
                  >
                    +972 54 615 0955
                  </a>
                  <CopyButton value="+972546150955" label="Copy phone number" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
