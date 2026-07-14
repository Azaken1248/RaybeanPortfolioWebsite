import { useState } from "react"
import type { WorkItem } from "../content/types"

type WorkCardProps = {
  work: WorkItem
}

/**
 * A single work tile with its caption.
 *
 * `work.image` is only ever a URL string, so this renders a local file or a
 * remote CDN URL with no branching. A failed load (missing file, dead CDN link)
 * falls back to the palette gradient behind it rather than a broken-image icon.
 */
export function WorkCard({ work }: WorkCardProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(work.image) && !failed

  const body = (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-card bg-gradient-to-br from-lavender/40 to-periwinkle/40 shadow-nav transition duration-300 group-hover:-translate-y-1 group-hover:shadow-soft">
        {showImage && (
          <img
            src={work.image}
            alt={work.alt}
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="size-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
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

  if (work.href) {
    return (
      <a
        href={work.href}
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
