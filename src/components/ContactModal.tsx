import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import { usePortfolio } from "../content/usePortfolio"
import { Icon } from "./Icon"

/** Same brand-tint treatment as the home page social row. */
const brandStyle = (color?: string) =>
  color ? ({ "--brand": color } as CSSProperties) : undefined
const brandedIcon =
  "bg-[color-mix(in_srgb,var(--brand)_15%,transparent)] text-[var(--brand)]"

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { contact, socials } = usePortfolio()
  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreFocusTo = useRef<HTMLElement | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const contactSocials = socials.filter(
    (social) => social.showInContact && social.url,
  )

  // Focus management: trap Tab inside the dialog, close on Escape, and hand
  // focus back to whatever opened it.
  useEffect(() => {
    if (!isOpen) return

    restoreFocusTo.current = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      )

    focusables()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
        return
      }

      if (event.key !== "Tab") return

      const items = focusables()
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      restoreFocusTo.current?.focus()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!copiedId) return
    const timer = window.setTimeout(() => setCopiedId(null), 1600)
    return () => window.clearTimeout(timer)
  }, [copiedId])

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
    } catch {
      // Clipboard can be blocked (insecure origin, denied permission). The
      // value is on screen and selectable, so this is not worth surfacing.
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-ink/35 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={contact.section.title}
            className="relative w-full max-w-lg rounded-card bg-surface p-7 shadow-soft sm:p-9"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                {contact.section.title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close contact"
                className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-bg text-ink transition hover:bg-ink hover:text-bg"
              >
                <Icon name="X" size={16} weight="bold" />
              </button>
            </div>

            <ul className="mt-6 space-y-3">
              {contact.methods.map((method) => {
                const copied = copiedId === method.id

                return (
                  <li
                    key={method.id}
                    className="rounded-2xl bg-bg p-4 transition hover:bg-periwinkle/25"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        style={brandStyle(method.color)}
                        className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                          method.color ? brandedIcon : "bg-ink text-bg"
                        }`}
                      >
                        <Icon name={method.icon} size={20} color={method.color} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm font-semibold text-ink">
                          {method.label}
                          {method.note && (
                            <span className="font-body ml-1.5 text-xs font-normal text-ink/60">
                              ({method.note})
                            </span>
                          )}
                        </p>
                        {method.href ? (
                          <a
                            href={method.href}
                            className="font-body block truncate text-sm text-ink/80 underline-offset-2 hover:underline"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="font-body truncate text-sm text-ink/80">
                            {method.value}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => copy(method.id, method.value)}
                        aria-label={`Copy ${method.label}${method.note ? ` (${method.note})` : ""}`}
                        className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-surface text-ink transition hover:bg-ink hover:text-bg"
                      >
                        <Icon
                          name={copied ? "Check" : "Copy"}
                          size={16}
                          weight="bold"
                        />
                      </button>
                    </div>

                    {copied && (
                      <p className="font-body mt-2 text-xs font-semibold text-ink/70">
                        copied!
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>

            {contactSocials.length > 0 && (
              <>
                <hr className="my-6 border-periwinkle/50" />
                <ul className="flex flex-wrap items-center justify-center gap-3">
                  {contactSocials.map((social) => (
                    <li key={social.platform}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={social.label}
                        title={social.label}
                        style={brandStyle(social.color)}
                        className={`grid size-11 place-items-center rounded-full transition duration-200 hover:scale-110 ${
                          social.color
                            ? brandedIcon
                            : "bg-lavender/30 text-ink hover:bg-ink hover:text-bg"
                        }`}
                      >
                        <Icon name={social.icon} size={20} color={social.color} />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/*
              The contact form slots in here when contact.form exists — that is
              the message-bot phase. See docs/architecture.md §7.
            */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
