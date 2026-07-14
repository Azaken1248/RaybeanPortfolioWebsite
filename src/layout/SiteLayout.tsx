import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { ContactModal } from "../components/ContactModal"
import { ScrollToTop } from "../components/ScrollToTop"
import { usePortfolio } from "../content/usePortfolio"
import { ContactModalContext } from "./contactModalContext"
import { SiteFooter } from "./SiteFooter"
import { SiteNav } from "./SiteNav"

/**
 * Owns everything that persists across routes: the background, the nav, the
 * footer, and the contact modal's open state. Pages are just their sections.
 */
export function SiteLayout() {
  const { site } = usePortfolio()
  const location = useLocation()

  // #contact deep-links straight into the modal, so the dialog stays shareable
  // without being a route of its own. Read once at mount rather than in an
  // effect — a hash arriving any other way means the user clicked something.
  const [contactOpen, setContactOpen] = useState(
    () => window.location.hash === "#contact",
  )

  const openContact = useCallback(() => setContactOpen(true), [])

  const closeContact = useCallback(() => {
    setContactOpen(false)

    if (window.location.hash === "#contact") {
      window.history.replaceState(null, "", window.location.pathname)
    }
  }, [])

  const contactValue = useMemo(() => ({ open: openContact }), [openContact])

  useEffect(() => {
    document.title = site.pageTitle
  }, [site.pageTitle])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [location.pathname])

  return (
    <ContactModalContext.Provider value={contactValue}>
      <div className="relative isolate min-h-screen bg-bg text-ink">
        {/* Soft blooms. Subtle enough to keep the flat, clean feel of the mock. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed -top-32 -left-32 -z-10 size-[28rem] rounded-full bg-lavender/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-1/3 -right-40 -z-10 size-[32rem] rounded-full bg-periwinkle/25 blur-3xl"
        />

        <SiteNav />

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mx-auto max-w-7xl px-4 sm:px-6"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <SiteFooter />

        <ScrollToTop />
        <ContactModal isOpen={contactOpen} onClose={closeContact} />
      </div>
    </ContactModalContext.Provider>
  )
}
