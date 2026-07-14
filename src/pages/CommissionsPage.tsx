import { usePortfolio } from "../content/usePortfolio"

export function CommissionsPage() {
  const { commissions } = usePortfolio()

  return (
    <>
      {/* Narrower than the page container: at full width the image half gets so
          wide that object-cover crops straight into the character's face. */}
      <section className="mx-auto mt-6 max-w-5xl sm:mt-16">
        <div className="grid overflow-hidden rounded-card bg-surface shadow-soft md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          {commissions.image && (
            <div className="relative min-h-[16rem] overflow-hidden bg-gradient-to-br from-lavender/25 to-periwinkle/25 md:min-h-[23rem] md:border-r md:border-periwinkle/50">
              <img
                src={commissions.image}
                // Decorative: the notice beside it already carries the meaning,
                // so announcing the art would only add noise for a screen reader.
                alt={commissions.imageAlt ?? ""}
                aria-hidden={!commissions.imageAlt}
                width={681}
                height={681}
                loading="eager"
                // Anchored top so the head survives and the body is what gets
                // cropped, which is how the reference frames her.
                className="absolute inset-0 size-full object-cover object-top"
              />
            </div>
          )}

          <div className="flex flex-col justify-center gap-5 p-8 sm:p-10 lg:p-12">
            <h1 className="font-display text-2xl leading-snug text-ink sm:text-3xl">
              {commissions.heading}
            </h1>

            <div className="space-y-4">
              {commissions.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-body text-sm leading-relaxed text-ink/75"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tiers render here the moment commissions.tiers is non-empty. */}
      {commissions.tiers.length > 0 && (
        <section className="mt-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commissions.tiers.map((tier) => (
              <li
                key={tier.id}
                className="rounded-card bg-surface p-6 shadow-nav"
              >
                <p className="font-display text-lg font-bold text-ink">
                  {tier.name}
                </p>
                <p className="font-display mt-1 text-ink/70">
                  {tier.priceLabel}
                </p>
                <p className="font-body mt-3 text-sm text-ink/70">
                  {tier.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
