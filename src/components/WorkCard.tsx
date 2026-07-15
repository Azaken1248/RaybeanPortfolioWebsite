import type { WorkItem } from "../content/types"
import { Icon } from "./Icon"
import { WorkImage } from "./WorkImage"

type WorkCardProps = {
  work: WorkItem
  /** "video" forces a 16:9 frame; "natural" lets the image keep its own ratio
   *  (used by the illustration masonry). */
  aspect?: "video" | "natural"
}

/**
 * A single work tile with its caption.
 *
 * `work.image` is only ever a URL string, so this renders a local file or a
 * remote CDN URL with no branching. A failed load falls back to the palette
 * gradient behind it rather than a broken-image icon.
 *
 * Video and storyboard works get a play badge and open their embed; everything
 * else opens its `href` when it has one.
 */
export function WorkCard({ work, aspect = "video" }: WorkCardProps) {
  const isVideo = work.medium === "video" || work.medium === "storyboard"
  const href = work.embedUrl ?? work.href
  const natural = aspect === "natural"

  const body = (
    <>
      <div
        className={`relative w-full overflow-hidden rounded-card bg-gradient-to-br from-lavender/40 to-periwinkle/40 shadow-nav transition duration-300 group-hover:-translate-y-1 group-hover:shadow-soft ${
          natural ? "" : "aspect-video"
        }`}
      >
        <WorkImage
          work={work}
          className={`transition duration-500 group-hover:scale-[1.04] ${
            natural ? "h-auto w-full" : "size-full object-cover"
          }`}
        />

        {isVideo && (
          <span className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full bg-ink/70 text-bg backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-ink">
              <Icon name="Play" size={24} weight="fill" className="ml-0.5" />
            </span>
          </span>
        )}
      </div>

      <div className="mt-4 px-1">
        <p className="font-display text-sm font-bold text-ink sm:text-base">
          {work.artist && (
            <span className="font-semibold text-ink/55">{work.artist} - </span>
          )}
          {work.title}
        </p>

        {work.tags && work.tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {work.tags.map((tag) => (
              <li
                key={tag}
                // Periwinkle rather than lavender: ink on it clears AA at 5.3:1,
                // where ink on lavender does not. See docs/requirements.md §2.2.
                className="font-body rounded-full bg-periwinkle/45 px-2.5 py-0.5 text-xs font-semibold text-ink/85"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="group block"
      >
        {body}
      </a>
    )
  }

  return <div className="group">{body}</div>
}
