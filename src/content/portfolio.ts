import type { PortfolioData } from "./types"

/**
 * The hardcoded content — today's single source of truth.
 *
 * Everything a visitor reads is in this file. No component imports it directly;
 * they all read it through usePortfolio(). When the admin API lands, this file
 * becomes the offline fallback and nothing else changes.
 *
 * TODO(ray): the values marked NEEDS-REAL-VALUE below are placeholders.
 */
export const defaultPortfolio: PortfolioData = {
  site: {
    siteName: "Raybean",
    pageTitle: "Raybean — Graphic Designer & Illustrator",
    metaDescription:
      "Raybean (Ray) — graphic designer, illustrator and video editor. Portfolio of graphic design, illustration, video and osu! storyboard work.",
    // NEEDS-REAL-VALUE: drop the PDF into public/ and this link works.
    resumeUrl: "/raybean-resume.pdf",
    resumeLabel: "click me for my resume!",
  },

  // No "home" entry — the Raybean logo is the link home, as in the reference.
  nav: [
    { id: "graphic-design", label: "graphic design", to: "/graphic-design" },
    { id: "illustration", label: "illustration", to: "/illustration" },
    { id: "video", label: "videos & storyboards", to: "/video" },
    { id: "commissions", label: "commissions", to: "/commissions" },
  ],

  socials: [
    {
      platform: "discord",
      label: "Discord",
      handle: "raybeanosu",
      // No public profile URL — this opens the contact modal instead.
      icon: "DiscordLogo",
      color: "#5865F2", // Discord blurple
      showInHero: true,
      showInFooter: true,
      showInContact: false,
    },
    {
      platform: "email",
      label: "Email",
      handle: "raybeanosutourney@gmail.com",
      url: "mailto:raybeanosutourney@gmail.com",
      icon: "EnvelopeSimple",
      color: "#C08A2E", // no brand colour exists; warm gold ties into the palette
      showInHero: true,
      showInFooter: true,
      showInContact: false,
    },
    {
      platform: "twitter",
      label: "Twitter",
      handle: "raybeanosu",
      url: "https://twitter.com/raybeanosu",
      icon: "TwitterLogo",
      color: "#1DA1F2", // Twitter blue
      showInHero: true,
      showInFooter: true,
      showInContact: true,
    },
    {
      platform: "bluesky",
      label: "Bluesky",
      handle: "raybean.cc",
      url: "https://bsky.app/profile/raybean.cc",
      icon: "bluesky",
      color: "#0085FF", // Bluesky blue
      showInHero: true,
      showInFooter: true,
      showInContact: true,
    },
    {
      platform: "pixiv",
      label: "Pixiv",
      url: "https://www.pixiv.net/en/users/103389894",
      icon: "pixiv",
      color: "#0096FA", // Pixiv blue
      showInHero: true,
      showInFooter: true,
      showInContact: true,
    },
    {
      platform: "youtube",
      label: "YouTube",
      handle: "@raybeanosu",
      url: "https://www.youtube.com/@raybeanosu",
      icon: "YoutubeLogo",
      color: "#E62117", // YouTube red
      showInHero: true,
      showInFooter: true,
      showInContact: true,
    },
    {
      platform: "vgen",
      label: "VGen",
      // NEEDS-REAL-VALUE: no VGen URL supplied yet, so it is hidden everywhere.
      // Add the url and flip these flags to show it.
      icon: "vgen",
      color: "#F05A28", // VGen orange
      showInHero: false,
      showInFooter: false,
      showInContact: false,
    },
  ],

  home: {
    hero: {
      greeting: "Hello, I'm Raybean!",
      intro: [
        "You can call me **Ray**.\nI'm a **graphic designer and illustrator**. I also like making **videos** from time to time. I love making cute things! >w<",
        "You can contact me via **discord** or **email**. I hope to be working with you in the future, making wonderful things together!~",
      ],
      // Ray's chibi, resized to 1000px and WebP'd (110KB, alpha intact) from the
      // 4.5MB source. If it ever fails to load, the placeholder circle renders.
      image: "/raybean-avatar.webp",
      imageAlt: "Chibi illustration of Raybean",
      imageCredit: {
        text: "Profile Photo by Dreamxiety!",
        note: "thank you!",
        href: "https://osu.ppy.sh/users/13103233",
      },
      ctaButtons: [
        {
          id: "resume",
          label: "my resume",
          href: "/raybean-resume.pdf",
          icon: "resume",
          external: true,
        },
        {
          id: "osu-profile",
          label: "my osu! profile",
          // NEEDS-REAL-VALUE: confirm the osu! username.
          href: "https://osu.ppy.sh/users/Raybean",
          icon: "osu",
          external: true,
        },
      ],
    },
    featured: {
      title: "Featured Works",
      description:
        "Some of my favourite projects! A combination of art, graphic design and osu! storyboards.",
    },
  },

  disciplines: [
    {
      id: "graphic-design",
      route: "/graphic-design",
      navLabel: "graphic design",
      section: { title: "graphic design" },
      toolsNote:
        "I mainly use **Adobe Photoshop, Figma and Affinity** for graphic designing, unless mentioned otherwise.",
      groups: [
        {
          id: "osu-projects",
          section: {
            title: "osu! projects",
            description:
              "I am a part of the osu! World Cup Design Team, responsible for creating the visuals for all osu! originals featured in World Cups.",
          },
          layout: "carousel",
        },
        {
          id: "community-projects",
          section: {
            title: "community projects",
            description:
              "These are some of the projects I've worked on for various osu! tournaments outside the World Cups. This was how I got my foot in the door with graphic design, back in 2023!",
          },
          layout: "carousel",
        },
        {
          id: "miscellaneous",
          section: {
            title: "miscellaneous",
            // TODO(ray): this line is my best read of the mock, which was too
            // small to be sure of. Correct it.
            description:
              "I have also worked on other projects, mostly in social media and merchandise design.",
          },
          layout: "carousel",
        },
      ],
    },
    {
      id: "illustration",
      route: "/illustration",
      navLabel: "illustration",
      section: {
        title: "illustration",
        description: "A small collection of my best works!",
      },
      // One group, no heading of its own — the page description covers it.
      groups: [{ id: "best-works", section: { title: "" }, layout: "masonry" }],
    },
    {
      id: "video",
      route: "/video",
      navLabel: "videos & storyboards",
      section: { title: "videos & storyboards" },
      groups: [
        {
          id: "videos",
          section: {
            title: "Videos",
            description:
              "I use DaVinci Resolve and occasionally Adobe After Effects for my videos.",
          },
          layout: "video-grid",
        },
        {
          id: "storyboards",
          section: {
            title: "osu! storyboards",
            description:
              "These are made not with a video editor, but directly inside osu!. These are some of my more recent works!",
          },
          layout: "video-grid",
        },
      ],
    },
  ],

  /*
   * Titles and categories are Ray's own. `tags` carries the categories shown on
   * the card; `discipline` / `group` decide which page a piece appears on.
   *
   * TODO(ray): a work sits in exactly one group. I put the graphic design pieces
   * under "Featured GFX" rather than "projects made for osu!" — move any that
   * belong under the osu! heading instead.
   *
   * `image` is just a URL string. It is "/works/x.webp" today and becomes a
   * Cloudinary URL later with no code change anywhere — see docs/architecture.md.
   */
  works: [
    {
      id: "nasu-is-not-fruits-desu",
      artist: "YUC'e",
      title: "Nasu Is Not Fruits Desu!",
      tags: ["osu! storyboard"],
      discipline: "video",
      group: "storyboards",
      medium: "storyboard",
      image: "/works/nasu-is-not-fruits-desu.webp",
      alt: "Nasu Is Not Fruits Desu! — colourful sticker-style storyboard art",
      featured: true,
      sortOrder: 1,
    },
    {
      id: "vacant-rhapsody",
      artist: "Penoreri",
      title: "Vacant Rhapsody",
      tags: ["Graphic Design"],
      discipline: "graphic-design",
      group: "osu-projects",
      medium: "image",
      image: "/works/vacant-rhapsody.webp",
      alt: "Vacant Rhapsody — a moonlit night sky over a lone flower",
      featured: true,
      sortOrder: 2,
    },
    {
      id: "anomaly-maria",
      artist: "Kuro feat. Kasane Teto",
      title: "Anomaly Maria",
      tags: ["Typography"],
      discipline: "graphic-design",
      group: "osu-projects",
      medium: "image",
      image: "/works/anomaly-maria.webp",
      alt: "Anomaly Maria — typography over a red-haired character among roses",
      featured: true,
      sortOrder: 3,
    },
    {
      id: "monitoring",
      artist: "DECO*27",
      title: "Monitoring",
      tags: ["Fanart"],
      discipline: "illustration",
      group: "best-works",
      medium: "image",
      image: "/works/monitoring.webp",
      alt: "Monitoring — Hatsune Miku fanart",
      featured: true,
      sortOrder: 4,
    },
    {
      id: "out-of-place",
      artist: "Cansol",
      title: "Out of Place",
      tags: ["Illustration", "Graphic Design"],
      discipline: "graphic-design",
      group: "osu-projects",
      medium: "image",
      image: "/works/out-of-place.webp",
      alt: "Out of Place — bold lettering over flowing ribbons of colour",
      featured: true,
      sortOrder: 5,
    },
    {
      id: "gumbarlzo",
      artist: "t+pazolite",
      title: "Gumbarlzo!",
      tags: ["osu! storyboard collab"],
      discipline: "video",
      group: "storyboards",
      medium: "storyboard",
      image: "/works/gumbarlzo.webp",
      alt: "Gumbarlzo! — a festival scene beneath torii gates",
      featured: true,
      sortOrder: 6,
    },
  ],

  commissions: {
    section: { title: "Commissions" },
    isOpen: false,
    notice:
      "My commissions are currently closed! Please contact me personally to know when i reopen them!",
    tiers: [],
  },

  contact: {
    section: { title: "Contact Me!" },
    methods: [
      {
        id: "discord",
        kind: "discord",
        label: "Discord",
        value: "raybeanosu",
        icon: "DiscordLogo",
      },
      {
        id: "email-osu",
        kind: "email",
        label: "Email",
        note: "for osu! enquiries only",
        value: "raybeanosutourney@gmail.com",
        href: "mailto:raybeanosutourney@gmail.com",
        icon: "EnvelopeSimple",
      },
      {
        id: "email-general",
        kind: "email",
        label: "Email",
        note: "for non-osu! enquiries",
        value: "shreyadas234@gmail.com",
        href: "mailto:shreyadas234@gmail.com",
        icon: "EnvelopeSimple",
      },
    ],
    // form is intentionally absent — it belongs to the message-bot phase.
  },

  footer: {
    copyright: "© {year} Raybean",
  },
}
