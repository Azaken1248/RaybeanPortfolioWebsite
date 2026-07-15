import type { WorkItem } from "../content/types"

/** What the lightbox is asked to show. */
export type LightboxMedia =
  | { kind: "image"; src: string; alt: string; title: string; artist?: string }
  | { kind: "video"; embedUrl: string; title: string; artist?: string }

/** What a click on a work should open in the lightbox, if anything. */
export function lightboxFor(work: WorkItem): LightboxMedia | null {
  const isVideo = work.medium === "video" || work.medium === "storyboard"
  if (isVideo && work.embedUrl) {
    return {
      kind: "video",
      embedUrl: work.embedUrl,
      title: work.title,
      artist: work.artist,
    }
  }
  if (work.image) {
    return {
      kind: "image",
      src: work.image,
      alt: work.alt,
      title: work.title,
      artist: work.artist,
    }
  }
  return null
}

/**
 * Extracts the id from a youtu.be/ID or youtube.com/watch?v=ID link and returns
 * the privacy-friendly embed URL, autoplaying since the click is the intent.
 * Returns null for anything that is not a recognisable YouTube link.
 */
export function toYouTubeEmbed(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/,
  )
  if (!match) return null
  return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0`
}
