import type { SiteTheme } from "./types"

/**
 * The defaults, mirroring the @theme block in index.css.
 *
 * index.css remains the source of truth for what the site looks like with no
 * theme configured — this exists so the admin has something to show and reset
 * to, and so a partial theme from the API can be filled in.
 */
export const DEFAULT_THEME: SiteTheme = {
  colors: {
    bg: "#f7f7f7",
    surface: "#ffffff",
    ink: "#464646",
    lavender: "#b2abc0",
    periwinkle: "#bdc2cf",
    cream: "#ecead9",
  },
  fonts: {
    display: "Poppins",
    body: "Nunito",
  },
}

/** Maps a theme key to the CSS custom property Tailwind generated for it. */
const COLOR_VARS: Record<keyof SiteTheme["colors"], string> = {
  bg: "--color-bg",
  surface: "--color-surface",
  ink: "--color-ink",
  lavender: "--color-lavender",
  periwinkle: "--color-periwinkle",
  cream: "--color-cream",
}

const FONT_VARS: Record<keyof SiteTheme["fonts"], string> = {
  display: "--font-display",
  body: "--font-body",
}

const FONT_STACK = "system-ui, sans-serif"
const FONT_LINK_ID = "site-theme-fonts"

/**
 * Applies a theme by setting the same custom properties `@theme` declares.
 *
 * An inline style on :root outranks the stylesheet's :root rule, so every
 * Tailwind utility built on these tokens — bg-bg, text-ink, font-display —
 * follows without a single class changing.
 */
export function applyTheme(theme: SiteTheme | undefined): void {
  if (!theme) return
  const root = document.documentElement

  for (const [key, cssVar] of Object.entries(COLOR_VARS)) {
    const value = theme.colors?.[key as keyof SiteTheme["colors"]]
    if (value) root.style.setProperty(cssVar, value)
  }

  for (const [key, cssVar] of Object.entries(FONT_VARS)) {
    const family = theme.fonts?.[key as keyof SiteTheme["fonts"]]
    if (family) root.style.setProperty(cssVar, `"${family}", ${FONT_STACK}`)
  }

  loadFonts(theme)
}

/**
 * Fonts have to arrive before they can be used, and index.html only preloads
 * the defaults. Any other family is requested from Google Fonts here.
 *
 * One link element, replaced on change: a family swap should not leave the
 * previous request behind.
 */
export function loadFonts(theme: SiteTheme): void {
  const families = [theme.fonts?.display, theme.fonts?.body].filter(
    (f): f is string => Boolean(f),
  )
  if (families.length === 0) return

  const query = [...new Set(families)]
    .map((f) => `family=${encodeURIComponent(f)}:wght@400;600;700`)
    .join("&")
  const href = `https://fonts.googleapis.com/css2?${query}&display=swap`

  const existing = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null
  if (existing?.href === href) return

  const link = existing ?? document.createElement("link")
  link.id = FONT_LINK_ID
  link.rel = "stylesheet"
  link.href = href
  if (!existing) document.head.appendChild(link)
}
