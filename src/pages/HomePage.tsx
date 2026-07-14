import { useState } from "react"
import { Icon } from "../components/Icon"
import { RichText } from "../components/RichText"
import { SectionHeading } from "../components/SectionHeading"
import { SocialRow } from "../components/SocialRow"
import { WorkGrid } from "../components/WorkGrid"
import { getFeaturedWorks } from "../content/selectors"
import { usePortfolio } from "../content/usePortfolio"
import { useContactModal } from "../layout/contactModalContext"

export function HomePage() {
  const data = usePortfolio()
  const { home } = data
  const { hero } = home
  const { open: openContact } = useContactModal()
  const [avatarFailed, setAvatarFailed] = useState(false)

  const showAvatar = Boolean(hero.image) && !avatarFailed
  const featured = getFeaturedWorks(data, 6)

  return (
    <>
      <section className="rounded-card bg-surface p-7 shadow-soft sm:p-12 lg:p-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
          <div className="mx-auto w-full max-w-[20rem] lg:max-w-none">
            <div className="relative aspect-square w-full overflow-hidden rounded-full bg-gradient-to-br from-lavender/35 to-periwinkle/35 ring-4 ring-lavender/60 ring-offset-4 ring-offset-surface">
              {showAvatar && (
                <img
                  src={hero.image}
                  alt={hero.imageAlt}
                  width={1000}
                  height={941}
                  // Above the fold and almost certainly the LCP element.
                  loading="eager"
                  fetchPriority="high"
                  // A missing file or a dead CDN URL falls back to the gradient
                  // behind it, rather than a broken-image icon.
                  onError={() => setAvatarFailed(true)}
                  className="size-full object-cover"
                />
              )}
            </div>

            {hero.imageCredit && (
              <p className="font-body mt-5 text-center text-xs leading-relaxed text-ink/60">
                {hero.imageCredit.href ? (
                  <a
                    href={hero.imageCredit.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold text-ink/75 underline-offset-2 hover:underline"
                  >
                    {hero.imageCredit.text}
                  </a>
                ) : (
                  <span className="font-semibold text-ink/75">
                    {hero.imageCredit.text}
                  </span>
                )}
                {hero.imageCredit.note && (
                  <span className="mt-0.5 block text-ink/45">
                    {hero.imageCredit.note}
                  </span>
                )}
              </p>
            )}
          </div>

          <div>
            <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
              {hero.greeting}
            </h1>

            <div className="mt-6 space-y-5">
              {hero.intro.map((paragraph, index) => (
                <RichText
                  key={index}
                  text={paragraph}
                  className="font-body max-w-xl leading-relaxed whitespace-pre-line text-ink/80"
                />
              ))}
            </div>

            <div className="mt-8">
              <SocialRow placement="hero" onContactClick={openContact} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {hero.ctaButtons.map((cta) => (
                <a
                  key={cta.id}
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noreferrer noopener" : undefined}
                  className="flex items-center gap-3 rounded-full bg-periwinkle/30 py-2 pr-6 pl-2 transition hover:bg-periwinkle/55"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink text-bg">
                    <Icon name={cta.icon} size={18} />
                  </span>
                  <span className="font-display text-sm leading-tight font-bold text-ink">
                    {cta.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mt-20 sm:mt-28">
          <SectionHeading section={home.featured} align="center" />
          <WorkGrid works={featured} className="mt-10 sm:mt-12" />
        </section>
      )}
    </>
  )
}
