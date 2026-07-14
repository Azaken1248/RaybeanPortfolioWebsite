import { useState } from "react"
import type { WorkItem } from "../content/types"

type WorkCardProps = {
  work: WorkItem
}

/**
 * A single work tile.
 *
 * `work.image` is only ever a URL string, so this renders a local placeholder,
 * a real local file, or a remote CDN URL with no branching. A failed load
 * (missing file, dead CDN link) falls back to the palette gradient behind it
 * rather than a broken-image icon.
 */
export function WorkCard({ work }: WorkCardProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(work.image) && !failed

  const tile = (
    <div className="relative aspect-video w-full overflow-hidden rounded-card bg-gradient-to-br from-lavender/40 to-periwinkle/40 shadow-nav transition duration-300 group-hover:-translate-y-1 group-hover:shadow-soft">
      {showImage && (
        <img
          src={work.image}
          alt={work.alt}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      )}

      <div className="absolute inset-0 bg-ink/0 transition duration-300 group-hover:bg-ink/40" />

      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-display text-base font-bold text-bg sm:text-lg">
          {work.title}
        </p>
        {work.description && (
          <p className="font-body mt-0.5 text-sm text-bg/80">
            {work.description}
          </p>
        )}
      </div>
    </div>
  )

  if (work.href) {
    return (
      <a
        href={work.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group block"
      >
        {tile}
      </a>
    )
  }

  return <div className="group">{tile}</div>
}
