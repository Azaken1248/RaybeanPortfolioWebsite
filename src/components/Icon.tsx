import type { IconWeight } from "@phosphor-icons/react"
import { createElement } from "react"
import {
  parseIconName,
  resolvePhosphorIcon,
  simpleIconUrl,
} from "../content/iconRegistry"

type IconProps = {
  name: string
  size?: number
  weight?: IconWeight
  className?: string
  /** Brand marks are flat colour; pass the social's colour to tint one. */
  color?: string
}

/**
 * Renders an icon from its content name, whichever source it names. Unknown
 * names render nothing rather than crashing the page.
 *
 * The looked-up Phosphor component is instantiated with createElement rather
 * than JSX: a capitalised variable in JSX reads to the linter as a component
 * being defined during render, which this is not — it is a registry lookup.
 */
export function Icon({
  name,
  size = 20,
  weight = "fill",
  className,
  color,
}: IconProps) {
  if (!name) return null
  const { source, id } = parseIconName(name)

  if (source === "phosphor") {
    const phosphorIcon = resolvePhosphorIcon(id)
    if (!phosphorIcon) return null
    return createElement(phosphorIcon, { size, weight, className })
  }

  if (source === "sprite") {
    return (
      <svg
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <use href={`/icons.svg#${id}`} />
      </svg>
    )
  }

  // simple: and url: both render as an image. currentColor cannot reach into an
  // <img>, so a brand mark is tinted via the CDN's colour segment instead.
  const src = source === "simple" ? simpleIconUrl(id, color) : id

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  )
}
