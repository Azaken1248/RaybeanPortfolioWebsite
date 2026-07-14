import type { SectionContent } from "../content/types"

type SectionHeadingProps = {
  section: SectionContent
  align?: "left" | "center"
  className?: string
}

/**
 * Used by every group on every page. An empty title renders nothing at all,
 * which is how Illustration gets a single grid with no redundant sub-heading.
 */
export function SectionHeading({
  section,
  align = "left",
  className,
}: SectionHeadingProps) {
  if (!section.title && !section.description && !section.eyebrow) return null

  const centered = align === "center"

  return (
    <header
      className={`${centered ? "text-center" : ""} ${className ?? ""}`.trim()}
    >
      {section.eyebrow && (
        <p className="font-body text-xs font-bold tracking-[0.2em] text-ink/50 uppercase">
          {section.eyebrow}
        </p>
      )}

      {section.title && (
        <h2
          className={`font-display mt-1.5 text-ink ${
            centered ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
          }`}
        >
          {section.title}
        </h2>
      )}

      {section.description && (
        <p
          className={`font-body mt-2 text-ink/70 ${
            centered ? "mx-auto max-w-2xl text-sm" : "max-w-2xl"
          }`}
        >
          {section.description}
        </p>
      )}
    </header>
  )
}
