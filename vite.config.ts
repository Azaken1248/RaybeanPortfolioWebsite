import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
// .js extension: nodenext resolution in tsconfig.node.json requires it, and it
// resolves to the .ts source at build time.
import { defaultPortfolio } from "./src/content/portfolio.js"

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

/**
 * Bakes the social-embed tags into index.html at build (and dev) time, from the
 * site config in portfolio.ts. They have to be in the served HTML rather than
 * set by React, because link-preview crawlers (Discord, Twitter, Slack, …) read
 * the raw markup and never run the JavaScript.
 *
 * Editing site.seo / site.pageTitle / site.metaDescription in portfolio.ts is
 * all it takes to change every preview.
 */
function seoTags(): Plugin {
  const { site } = defaultPortfolio
  const { seo } = site
  const abs = (path: string) =>
    path.startsWith("http") ? path : `${seo.url.replace(/\/$/, "")}${path}`

  const tags = [
    `<title>${escape(site.pageTitle)}</title>`,
    `<meta name="description" content="${escape(site.metaDescription)}" />`,
    `<meta name="theme-color" content="${escape(seo.themeColor)}" />`,
    `<link rel="canonical" href="${escape(seo.url)}" />`,

    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(site.siteName)}" />`,
    `<meta property="og:title" content="${escape(site.pageTitle)}" />`,
    `<meta property="og:description" content="${escape(site.metaDescription)}" />`,
    `<meta property="og:url" content="${escape(seo.url)}" />`,
    `<meta property="og:image" content="${escape(abs(seo.ogImage))}" />`,
    `<meta property="og:image:alt" content="${escape(seo.ogImageAlt)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(site.pageTitle)}" />`,
    `<meta name="twitter:description" content="${escape(site.metaDescription)}" />`,
    `<meta name="twitter:image" content="${escape(abs(seo.ogImage))}" />`,
    ...(seo.twitterHandle
      ? [`<meta name="twitter:site" content="${escape(seo.twitterHandle)}" />`]
      : []),
  ]

  return {
    name: "seo-tags",
    transformIndexHtml(html) {
      return html.replace("<!--seo-->", tags.join("\n    "))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoTags()],
})
