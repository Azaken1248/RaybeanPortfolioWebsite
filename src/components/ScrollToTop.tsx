import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Icon } from "./Icon"

const SHOW_AFTER = 400

/**
 * Appears once there is something to scroll back up to.
 *
 * Initial state is read lazily rather than in an effect, so a page loaded
 * already scrolled (a refresh, a back-navigation) shows the button on the
 * first paint instead of flashing it in.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(() => window.scrollY > SHOW_AFTER)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.18 }}
          className="fixed right-5 bottom-5 z-50 grid size-12 cursor-pointer place-items-center rounded-full bg-surface text-ink shadow-soft transition-colors hover:bg-ink hover:text-bg sm:right-8 sm:bottom-8"
        >
          <Icon name="chevron-down" size={20} className="rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
