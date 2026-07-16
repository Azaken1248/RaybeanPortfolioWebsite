/**
 * The wire shape the future admin API will serve.
 *
 * This is deliberately NOT the domain model. It carries database concerns
 * (_id, sortOrder, timestamps) that the UI must never see. adapter.ts maps
 * this onto types.ts, and that mapping is the only place the two shapes meet.
 */

import type {
  ContactFormField,
  DisciplineId,
  SectionContent,
  WorkMedium,
} from "./types"

type Timestamped = {
  _id: string
  createdAt: string
  updatedAt: string
}

export type ApiSiteConfig = {
  siteName: string
  pageTitle: string
  metaDescription: string
  resumeUrl: string
  resumeLabel: string
  seo: {
    url: string
    ogImage: string
    ogImageAlt: string
    themeColor: string
    twitterHandle?: string
  }
}

export type ApiNavItem = {
  id: string
  label: string
  to: string
}

export type ApiSocialLink = {
  platform: string
  label: string
  handle?: string
  url?: string
  icon: string
  /** Brand tint for the icon. Without it the row renders neutral grey. */
  color?: string
  showInHero: boolean
  showInFooter: boolean
  showInContact: boolean
}

export type ApiCtaButton = {
  id: string
  label: string
  href: string
  icon: string
  external?: boolean
}

export type ApiImageCredit = {
  text: string
  note?: string
  href?: string
}

export type ApiHeroContent = {
  greeting: string
  intro: string[]
  imageUrl: string
  imageAlt: string
  imageCredit?: ApiImageCredit
  ctaButtons: ApiCtaButton[]
}

export type ApiWorkGroup = {
  id: string
  section: SectionContent
  layout: "grid" | "masonry" | "video-grid"
}

export type ApiDiscipline = Timestamped & {
  id: DisciplineId
  route: string
  navLabel: string
  section: SectionContent
  toolsNote?: string
  groups: ApiWorkGroup[]
  sortOrder: number
}

export type ApiWork = Timestamped & {
  id: string
  artist?: string
  title: string
  discipline: DisciplineId
  group: string
  medium: WorkMedium
  description?: string
  /** Cloudinary URL once uploads exist. */
  imageUrl: string
  /** Natural pixel dimensions; the masonry needs them to keep portraits portrait. */
  width?: number
  height?: number
  altText: string
  href?: string
  embedUrl?: string
  tags?: string[]
  year?: string
  featured: boolean
  sortOrder: number
}

export type ApiCommissionTier = Timestamped & {
  id: string
  name: string
  priceLabel: string
  description: string
  sortOrder: number
}

export type ApiContactMethod = {
  id: string
  kind: "discord" | "email"
  label: string
  note?: string
  value: string
  href?: string
  icon: string
  color?: string
}

export type ApiPortfolioResponse = {
  success: boolean
  data: {
    _id: string
    siteConfig: ApiSiteConfig
    nav: ApiNavItem[]
    socials: ApiSocialLink[]
    heroContent: ApiHeroContent
    featuredSection: SectionContent
    disciplines: ApiDiscipline[]
    works: ApiWork[]
    commissions: {
      section: SectionContent
      isOpen: boolean
      heading: string
      body: string[]
      imageUrl?: string
      imageAlt?: string
    }
    commissionTiers: ApiCommissionTier[]
    contactContent: {
      section: SectionContent
      methods: ApiContactMethod[]
      form?: {
        fields: ContactFormField[]
        submitLabel: string
        endpoint: string
        disclaimer?: string
      }
    }
    footerContent: {
      copyright: string
      tagline?: string
      credit?: {
        prefix: string
        name: string
        href?: string
      }
    }
  }
}
