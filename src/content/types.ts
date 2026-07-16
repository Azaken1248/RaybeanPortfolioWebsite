/**
 * The domain model. This is the ONLY content shape components know about.
 *
 * Today it is filled from portfolio.ts (hardcoded). Later it is filled from the
 * admin API via adapter.ts. Components cannot tell the difference, which is the
 * whole point — see docs/architecture.md §2.
 */

export type DisciplineId = "graphic-design" | "illustration" | "video"

export type WorkMedium = "image" | "video" | "storyboard"

/**
 * The site's palette and type, as data.
 *
 * These were CSS tokens in index.css. They still are — index.css holds the
 * defaults, and this overrides them at runtime by setting the same custom
 * properties on :root. So the site renders correctly before any of this loads,
 * and the admin can retheme it without a deploy.
 */
export type SiteTheme = {
  colors: {
    /** Page background. */
    bg: string
    /** Cards and raised containers. */
    surface: string
    /** Body text, headings, the dark button. */
    ink: string
    /** Primary accent. Surfaces and borders only — never text. */
    lavender: string
    /** Secondary accent. Tinted surfaces that carry text. */
    periwinkle: string
    /** Optional warm accent. */
    cream: string
  }
  fonts: {
    /** Headings and the wordmark. */
    display: string
    /** Body copy and UI. */
    body: string
  }
}

export type SiteConfig = {
  siteName: string
  pageTitle: string
  metaDescription: string
  /** Points at a PDF today; later this can point at a dedicated resume site. */
  resumeUrl: string
  resumeLabel: string
  /**
   * Social-embed (Open Graph / Twitter card) config. These are baked into the
   * served HTML at build time so link-preview crawlers, which do not run JS,
   * can read them. See vite.config.ts.
   */
  seo: {
    /** Canonical absolute site URL, e.g. https://portfolio.raybean.cc */
    url: string
    /** Absolute or root-relative preview image (1200x630 works best). */
    ogImage: string
    ogImageAlt: string
    /** Browser UI tint, and the OG type. */
    themeColor: string
    /** e.g. "@raybeanosu" — omit for a plain summary card. */
    twitterHandle?: string
  }
  /** Omit to use the defaults compiled into index.css. */
  theme?: SiteTheme
}

export type SocialLink = {
  platform: string
  label: string
  /** The handle itself, where there is one to show or copy (e.g. "raybeanosu"). */
  handle?: string
  /** Absent means there is no public profile URL to link to (e.g. Discord). */
  url?: string
  /** Name resolved through iconRegistry.ts — never an imported component. */
  icon: string
  /**
   * Brand colour. Tints the icon and its circle. Omit and it falls back to the
   * neutral lavender treatment.
   */
  color?: string
  showInHero: boolean
  showInFooter: boolean
  showInContact: boolean
}

export type NavItem = {
  id: string
  label: string
  to: string
  /** Optional. Renders before the label; omit for a text-only link. */
  icon?: string
}

export type CtaButton = {
  id: string
  label: string
  href: string
  icon: string
  external?: boolean
}

export type SectionContent = {
  eyebrow?: string
  /** An empty title means the section renders without a heading. */
  title: string
  description?: string
}

export type WorkItem = {
  id: string
  /** The track/song the work was made for, where there is one. */
  artist?: string
  title: string
  discipline: DisciplineId
  /** Id of the WorkGroup this belongs to, within its discipline. */
  group: string
  medium: WorkMedium
  description?: string
  /** Empty string renders a styled placeholder tile. Set it to swap in real art. */
  image: string
  /** Natural pixel dimensions, so the image reserves correct space and the
   *  masonry keeps portraits portrait instead of forcing a 16:9 ratio. */
  width?: number
  height?: number
  alt: string
  /** Outbound link — a Pixiv post, a beatmap page, a tournament page. */
  href?: string
  /** For medium "video" | "storyboard". */
  embedUrl?: string
  tags?: string[]
  year?: string
  /** Surfaces the work in Home's "Featured / Latest Works". */
  featured: boolean
  sortOrder: number
}

export type WorkGroup = {
  id: string
  section: SectionContent
  /** Chosen per group in content, so a section's presentation is data, not code. */
  layout: "grid" | "masonry" | "video-grid" | "carousel"
}

export type DisciplinePage = {
  id: DisciplineId
  route: string
  navLabel: string
  /** Optional. Shown on the home page's discipline cards. */
  icon?: string
  section: SectionContent
  /** e.g. "I mainly use Adobe Photoshop, Figma and Affinity..." */
  toolsNote?: string
  groups: WorkGroup[]
}

export type ImageCredit = {
  text: string
  note?: string
  /** Link to the artist, where there is one. */
  href?: string
}

export type HeroContent = {
  greeting: string
  /**
   * Paragraphs. May contain **bold** markers and \n soft line breaks —
   * rendered by components/RichText.tsx.
   */
  intro: string[]
  /** Empty (or a URL that fails to load) renders a placeholder circle. */
  image: string
  imageAlt: string
  /** Artist credit shown under the avatar. Omit and nothing renders. */
  imageCredit?: ImageCredit
  ctaButtons: CtaButton[]
}

export type HomeContent = {
  hero: HeroContent
  featured: SectionContent
}

export type CommissionTier = {
  id: string
  name: string
  priceLabel: string
  description: string
  sortOrder: number
}

export type CommissionsContent = {
  section: SectionContent
  isOpen: boolean
  /** Headline on the notice card. */
  heading: string
  /** Body paragraphs beneath it. */
  body: string[]
  /** Art beside the notice. Omit and the card renders text-only. */
  image?: string
  imageAlt?: string
  /** Empty today — commissions are closed. Renders automatically once filled. */
  tiers: CommissionTier[]
}

export type ContactMethod = {
  id: string
  kind: "discord" | "email"
  label: string
  /** e.g. "for osu! enquiries only" */
  note?: string
  value: string
  href?: string
  icon: string
  /** Brand colour for the icon, matching the home page social row. */
  color?: string
}

export type ContactFormField = {
  name: string
  label: string
  type: "text" | "email" | "textarea"
  placeholder: string
  rows?: number
}

export type ContactContent = {
  section: SectionContent
  /** The dark nav button's label. */
  buttonLabel: string
  methods: ContactMethod[]
  /**
   * RESERVED — absent today. The contact form belongs to the message-bot phase.
   * When this is present, ContactModal renders the form in the same dialog.
   * See docs/architecture.md §7.
   */
  form?: {
    fields: ContactFormField[]
    submitLabel: string
    endpoint: string
    disclaimer?: string
  }
}

export type FooterContent = {
  /** "{year}" is substituted at render time. */
  copyright: string
  tagline?: string
  /** Who built the site. Omit and nothing renders. */
  credit?: {
    prefix: string
    name: string
    href?: string
  }
}

export type PortfolioData = {
  site: SiteConfig
  nav: NavItem[]
  socials: SocialLink[]
  home: HomeContent
  disciplines: DisciplinePage[]
  /** Flat, so it maps 1:1 onto a future Mongo collection. Grouped by selectors. */
  works: WorkItem[]
  commissions: CommissionsContent
  contact: ContactContent
  footer: FooterContent
}
