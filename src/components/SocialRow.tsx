import type { CSSProperties } from "react"
import { usePortfolio } from "../content/usePortfolio"
import { Icon } from "./Icon"

type SocialRowProps = {
  placement: "hero" | "footer"
  /** Socials with no URL (Discord) open the contact modal instead of linking. */
  onContactClick: () => void
  size?: "sm" | "md"
}

const SIZES = {
  sm: { box: "size-9", icon: 16 },
  md: { box: "size-11", icon: 20 },
}

/**
 * Each social is tinted with its own brand colour, driven from content.
 * The colour is passed in as a custom property so the circle, the icon and the
 * hover state all derive from one value — and so no hex is hardcoded here.
 */
export function SocialRow({
  placement,
  onContactClick,
  size = "md",
}: SocialRowProps) {
  const { socials } = usePortfolio()
  const { box, icon } = SIZES[size]

  const visible = socials.filter((social) =>
    placement === "hero" ? social.showInHero : social.showInFooter,
  )

  if (visible.length === 0) return null

  const branded = `grid ${box} place-items-center rounded-full transition duration-200 hover:scale-110 bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] text-[var(--brand)] hover:bg-[color-mix(in_srgb,var(--brand)_26%,transparent)]`
  const neutral = `grid ${box} place-items-center rounded-full bg-lavender/30 text-ink transition duration-200 hover:scale-110 hover:bg-ink hover:text-bg`

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {visible.map((social) => {
        const style = social.color
          ? ({ "--brand": social.color } as CSSProperties)
          : undefined
        const className = social.color ? branded : neutral

        return (
          <li key={social.platform}>
            {social.url ? (
              <a
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                aria-label={social.label}
                title={social.handle ?? social.label}
                style={style}
                className={className}
              >
                <Icon name={social.icon} size={icon} color={social.color} />
              </a>
            ) : (
              <button
                type="button"
                onClick={onContactClick}
                aria-label={`${social.label} — ${social.handle}`}
                title={social.handle ?? social.label}
                style={style}
                className={`${className} cursor-pointer`}
              >
                <Icon name={social.icon} size={icon} color={social.color} />
              </button>
            )}
          </li>
        )
      })}
    </ul>
  )
}
