import { Fragment } from "react"

type RichTextProps = {
  /** May contain **bold** spans. \n renders as a line break. */
  text: string
  className?: string
}

/**
 * Renders the light markup allowed in content strings: **bold** only.
 *
 * Content is authored as plain strings rather than HTML, so nothing the artist
 * (or the future admin panel) types can inject markup into the page.
 */
export function RichText({ text, className }: RichTextProps) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)

  return (
    <p className={className}>
      {segments.map((segment, index) => {
        const bold = segment.startsWith("**") && segment.endsWith("**")

        return bold ? (
          <strong key={index} className="font-bold text-ink">
            {segment.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={index}>{segment}</Fragment>
        )
      })}
    </p>
  )
}
