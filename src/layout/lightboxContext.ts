import { createContext, useContext } from "react"
import type { LightboxMedia } from "../components/mediaLightboxTypes"

/**
 * Lets any work tile open the media lightbox — a full illustration, or a video
 * playing inline — without prop-drilling through the grids and carousel.
 */
export const LightboxContext = createContext<{
  open: (media: LightboxMedia) => void
}>({ open: () => {} })

export function useLightbox() {
  return useContext(LightboxContext)
}
