import { useState } from "react"
import type { WorkItem } from "../content/types"

type WorkImageProps = {
  work: WorkItem
  className?: string
}

/**
 * The image itself, with the fallback both the grid and the carousel rely on.
 *
 * `work.image` is only ever a URL string, so a local file and a remote CDN URL
 * are the same here. A failed load leaves the palette gradient showing rather
 * than a broken-image icon, which matters more once images live on a CDN.
 */
export function WorkImage({ work, className }: WorkImageProps) {
  const [failed, setFailed] = useState(false)

  if (!work.image || failed) return null

  return (
    <img
      src={work.image}
      alt={work.alt}
      width={1600}
      height={900}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
