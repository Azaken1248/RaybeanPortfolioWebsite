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
