import type { IconWeight } from "@phosphor-icons/react"
import { createElement } from "react"
import { isSpriteIcon, resolvePhosphorIcon } from "../content/iconRegistry"

type IconProps = {
  name: string
  size?: number
  weight?: IconWeight
  className?: string
}

/**
 * Renders an icon from its content name, whichever source it lives in.
 * Unknown names render nothing rather than crashing the page.
 *
 * The looked-up Phosphor component is instantiated with createElement rather
 * than JSX: a capitalised variable in JSX reads to the linter as a component
 * being defined during render, which this is not — it is a registry lookup.
 */
export function Icon({ name, size = 20, weight = "fill", className }: IconProps) {
  const phosphorIcon = resolvePhosphorIcon(name)

  if (phosphorIcon) {
    return createElement(phosphorIcon, { size, weight, className })
  }

  if (isSpriteIcon(name)) {
    return (
      <svg
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <use href={`/icons.svg#${name}`} />
      </svg>
    )
  }

  return null
}
