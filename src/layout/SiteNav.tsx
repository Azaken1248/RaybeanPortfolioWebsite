import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Icon } from "../components/Icon"
import { usePortfolio } from "../content/usePortfolio"
import { useContactModal } from "./contactModalContext"

export function SiteNav() {
  const { nav, site } = usePortfolio()
  const { open: openContact } = useContactModal()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-4 sm:gap-3 sm:px-6 sm:py-6">
        <nav
          aria-label="Main"
          className="flex min-w-0 flex-1 items-center rounded-full bg-surface px-4 py-2.5 shadow-nav sm:px-7 sm:py-4"
        >
          <Link
            to="/"
            className="font-display shrink-0 text-base font-bold text-ink sm:text-xl"
          >
            {site.siteName}
          </Link>

          <ul className="ml-auto hidden items-center gap-5 pr-1 lg:flex lg:gap-6 xl:gap-9">
            {nav.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "font-display relative py-1 text-[0.9rem] whitespace-nowrap transition-colors xl:text-[0.95rem]",
                      isActive
                        ? "font-bold text-ink"
                        : "font-normal text-ink/70 hover:text-ink",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-lavender"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="ml-auto grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-ink transition hover:bg-bg sm:size-9 lg:hidden"
          >
            <Icon name={menuOpen ? "X" : "List"} size={20} weight="bold" />
          </button>
        </nav>

        <button
          type="button"
          onClick={openContact}
          className="font-display shrink-0 cursor-pointer rounded-full bg-ink px-4 py-2.5 text-sm font-bold whitespace-nowrap text-bg shadow-nav transition hover:scale-[1.03] sm:px-7 sm:py-4 sm:text-base"
        >
          contact me!
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto max-w-7xl px-3 pb-2 sm:px-6 lg:hidden"
          >
            <ul className="rounded-card bg-surface p-3 shadow-nav">
              {nav.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    // Closed on click rather than on a pathname effect: tapping a
                    // link is the only way to navigate out of the open drawer.
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        "font-display block rounded-2xl px-4 py-3 transition",
                        isActive
                          ? "bg-periwinkle/40 font-bold text-ink"
                          : "text-ink/75 hover:bg-bg hover:text-ink",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}