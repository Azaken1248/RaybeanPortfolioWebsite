import type { ApiPortfolioResponse } from "./apiTypes"
import type { PortfolioData } from "./types"

/**
 * Maps the API wire shape onto the domain model.
 *
 * This is the seam. Database concerns (_id, timestamps, imageUrl vs image) die
 * here, so the components downstream never learn where content came from.
 *
 * Dormant today — nothing calls this until VITE_PORTFOLIO_API_URL is set.
 */
export function mapApiToPortfolio(
  raw: ApiPortfolioResponse["data"],
): PortfolioData {
  const disciplines = [...raw.disciplines]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((discipline) => ({
      id: discipline.id,
      route: discipline.route,
      navLabel: discipline.navLabel,
      section: discipline.section,
      toolsNote: discipline.toolsNote,
      groups: discipline.groups.map((group) => ({
        id: group.id,
        section: group.section,
        layout: group.layout,
      })),
    }))

  return {
    site: { ...raw.siteConfig },

    nav: raw.nav.map((item) => ({
      id: item.id,
      label: item.label,
      to: item.to,
    })),

    socials: raw.socials.map((social) => ({
      platform: social.platform,
      label: social.label,
      handle: social.handle,
      url: social.url,
      icon: social.icon,
      color: social.color,
      showInHero: social.showInHero,
      showInFooter: social.showInFooter,
      showInContact: social.showInContact,
    })),

    home: {
      hero: {
        greeting: raw.heroContent.greeting,
        intro: [...raw.heroContent.intro],
        image: raw.heroContent.imageUrl,
        imageAlt: raw.heroContent.imageAlt,
        imageCredit: raw.heroContent.imageCredit,
        ctaButtons: raw.heroContent.ctaButtons.map((cta) => ({ ...cta })),
      },
      featured: raw.featuredSection,
    },

    disciplines,

    works: raw.works.map((work) => ({
      id: work.id,
      artist: work.artist,
      title: work.title,
      discipline: work.discipline,
      group: work.group,
      medium: work.medium,
      description: work.description,
      image: work.imageUrl,
      width: work.width,
      height: work.height,
      alt: work.altText,
      href: work.href,
      embedUrl: work.embedUrl,
      tags: work.tags,
      year: work.year,
      featured: work.featured,
      sortOrder: work.sortOrder,
    })),

    commissions: {
      section: raw.commissions.section,
      isOpen: raw.commissions.isOpen,
      heading: raw.commissions.heading,
      body: [...raw.commissions.body],
      image: raw.commissions.imageUrl,
      imageAlt: raw.commissions.imageAlt,
      tiers: [...raw.commissionTiers]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((tier) => ({
          id: tier.id,
          name: tier.name,
          priceLabel: tier.priceLabel,
          description: tier.description,
          sortOrder: tier.sortOrder,
        })),
    },

    contact: {
      section: raw.contactContent.section,
      methods: raw.contactContent.methods.map((method) => ({ ...method })),
      form: raw.contactContent.form,
    },

    footer: { ...raw.footerContent },
  }
}
