import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { Icon } from "./Icon"
import { toYouTubeEmbed, type LightboxMedia } from "./mediaLightboxTypes"

type MediaLightboxProps = {
  media: LightboxMedia | null
  onClose: () => void
}

/**
 * Shows a full illustration, or plays a video inline. Same accessible-dialog
 * treatment as the contact modal: focus trap, Escape to close, backdrop click,
 * and focus handed back to whatever opened it.
 */
export function MediaLightbox({ media, onClose }: MediaLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreFocusTo = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!media) return

    restoreFocusTo.current = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const closeButton = dialogRef.current?.querySelector<HTMLElement>("button")
    closeButton?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      // The dialog holds a single focusable (close) plus, for video, an iframe.
      // Keep Tab from leaving the overlay.
      if (event.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, iframe, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      restoreFocusTo.current?.focus()
    }
  }, [media, onClose])

  const embedUrl = media?.kind === "video" ? toYouTubeEmbed(media.embedUrl) : null

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          className="fixed inset-0 z-100 grid place-items-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={media.title}
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-2 -right-2 z-10 grid size-10 cursor-pointer place-items-center rounded-full bg-surface text-ink shadow-soft transition hover:bg-ink hover:text-bg sm:-top-3 sm:-right-3"
            >
              <Icon name="X" size={18} weight="bold" />
            </button>

            {media.kind === "image" ? (
              <img
                src={media.src}
                alt={media.alt}
                className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-soft"
              />
            ) : embedUrl ? (
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-ink shadow-soft">
                <iframe
                  src={embedUrl}
                  title={media.title}
                  className="size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}

            <p className="font-display mt-4 max-w-full truncate text-center text-sm font-bold text-bg">
              {media.artist && (
                <span className="font-semibold text-bg/60">
                  {media.artist} -{" "}
                </span>
              )}
              {media.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
