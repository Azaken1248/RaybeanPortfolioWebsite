import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  DiscordLogoIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  FilmSlateIcon,
  HandshakeIcon,
  HouseIcon,
  ImageIcon,
  ListIcon,
  PaintBrushIcon,
  PaletteIcon,
  PlayIcon,
  ReadCvLogoIcon,
  SparkleIcon,
  TwitterLogoIcon,
  VideoCameraIcon,
  XIcon,
  YoutubeLogoIcon,
  type Icon,
} from "@phosphor-icons/react"

/**
 * Icons are name-strings in content, resolved here at render.
 *
 * Two sources, one lookup:
 *   - Phosphor components, for everything Phosphor ships.
 *   - public/icons.svg sprite symbols, for the brand marks it does not
 *     (bluesky, pixiv, osu, vgen).
 *
 * Callers use <Icon name="..." /> and never learn which source answered. The
 * future admin icon-picker writes these same strings.
 */

const phosphor: Record<string, Icon> = {
  ArrowUpRight: ArrowUpRightIcon,
  Check: CheckIcon,
  Copy: CopyIcon,
  DiscordLogo: DiscordLogoIcon,
  EnvelopeSimple: EnvelopeSimpleIcon,
  FileText: FileTextIcon,
  FilmSlate: FilmSlateIcon,
  Handshake: HandshakeIcon,
  House: HouseIcon,
  Image: ImageIcon,
  List: ListIcon,
  PaintBrush: PaintBrushIcon,
  Palette: PaletteIcon,
  Play: PlayIcon,
  ReadCvLogo: ReadCvLogoIcon,
  Sparkle: SparkleIcon,
  TwitterLogo: TwitterLogoIcon,
  VideoCamera: VideoCameraIcon,
  X: XIcon,
  YoutubeLogo: YoutubeLogoIcon,
}

/**
 * Icon names carry their source as a prefix, so the admin can pick from several
 * sets and this resolves them without knowing the picker exists:
 *
 *   phosphor:House   a Phosphor glyph (bundled)
 *   simple:discord   a Simple Icons brand mark, fetched from their CDN
 *   sprite:osu       a symbol from public/icons.svg
 *   https://…        any image URL
 *   House            legacy unprefixed, treated as Phosphor
 */
export type IconSource = "phosphor" | "simple" | "sprite" | "url"

export function parseIconName(name: string): { source: IconSource; id: string } {
  if (isUrl(name)) return { source: "url", id: name }
  const idx = name.indexOf(":")
  if (idx > 0) {
    const prefix = name.slice(0, idx)
    if (prefix === "phosphor" || prefix === "simple" || prefix === "sprite") {
      return { source: prefix, id: name.slice(idx + 1) }
    }
  }
  return { source: "phosphor", id: name }
}

export function isUrl(name: string): boolean {
  return (
    name.startsWith("http://") ||
    name.startsWith("https://") ||
    name.startsWith("blob:") ||
    name.startsWith("data:")
  )
}

/**
 * Simple Icons ships 3,449 marks. Bundling the package to look one up by a
 * runtime slug would defeat tree-shaking and drag megabytes into a portfolio,
 * so brand marks come from their CDN instead — cached, colourable, and costing
 * the bundle nothing.
 */
export function simpleIconUrl(slug: string, color?: string): string {
  const tint = color?.replace("#", "")
  return `https://cdn.simpleicons.org/${slug}${tint ? `/${tint}` : ""}`
}

/** Symbol ids present in public/icons.svg. */
const sprite = new Set([
  "discord",
  "bluesky",
  "osu",
  "resume",
  "chevron-down",
  "pixiv",
  "vgen",
])

export function resolvePhosphorIcon(name: string | undefined): Icon | undefined {
  if (!name) return undefined
  return phosphor[name]
}

export function isSpriteIcon(name: string | undefined): boolean {
  return !!name && sprite.has(name)
}
