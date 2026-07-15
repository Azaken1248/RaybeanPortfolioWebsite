import { usePortfolio } from "../content/usePortfolio"

export function CommissionsPage() {
  const { commissions } = usePortfolio()

  return (
    <>
      <section className="mx-auto mt-6 max-w-5xl sm:mt-16">
        {/*
          Two genuinely different layouts, not one that reflows. The sticker is
          drawn peeking in from the left with transparent space around her, so
          she must be shown whole (object-contain, never cropped or zoomed).

          - md and up: a side-by-side split, she stands in the left panel.
          - below md: she peeks up from the BOTTOM of the card. Stacking the
            square sticker on top of the text left an awkward gap and dead space;
            peeking from the bottom edge keeps her charm and needs no tall image
            block. The text reserves room for her with padding-bottom.
        */}
        <div className="relative overflow-hidden rounded-card bg-surface shadow-soft md:grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
          {commissions.image && (
            <div className="pointer-events-none absolute right-0 bottom-0 flex items-end md:relative md:inset-auto md:min-h-[24rem] md:w-full md:justify-end md:bg-gradient-to-br md:from-lavender/25 md:to-periwinkle/20">
              <img
                src={commissions.image}
                // Decorative: the notice beside it already carries the meaning,
                // so announcing the art would only add noise for a screen reader.
                alt={commissions.imageAlt ?? ""}
                aria-hidden={!commissions.imageAlt}
                width={681}
                height={681}
                loading="eager"
                // Below md she peeks from the bottom-right, mirrored so her drawn
                // hard edge (she is cut on the right for the desktop divider)
                // lines up with the card's right edge and she faces inward. From
                // md up she stands upright in the split panel, unflipped.
                className="h-36 w-auto max-w-none -scale-x-100 object-contain object-bottom md:h-full md:max-h-[24rem] md:w-full md:scale-x-100 md:object-right-bottom"
              />
            </div>
          )}

          <div className="relative flex flex-col justify-center gap-5 p-8 pb-40 sm:p-10 sm:pb-44 md:p-10 md:pb-10 lg:p-12 lg:pb-12">
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
