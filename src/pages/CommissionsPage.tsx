import { Icon } from "../components/Icon"
import { usePortfolio } from "../content/usePortfolio"
import { useContactModal } from "../layout/contactModalContext"

export function CommissionsPage() {
  const { commissions } = usePortfolio()
  const { open: openContact } = useContactModal()

  return (
    <>
      <header className="pt-4 pb-2 sm:pt-8">
        <h1 className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl">
          {commissions.section.title}
        </h1>
      </header>

      <section className="mt-8">
        <div className="rounded-card bg-surface p-7 shadow-soft sm:p-10">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-bg">
              <Icon name="Handshake" size={24} />
            </span>

            <div className="flex-1">
              <p className="font-body inline-flex items-center gap-2 rounded-full bg-periwinkle/40 px-3 py-1 text-xs font-bold tracking-wide text-ink uppercase">
                {commissions.isOpen ? "open" : "closed"}
              </p>
              <p className="font-body mt-3 max-w-xl leading-relaxed text-ink/80">
                {commissions.notice}
              </p>
            </div>

            <button
              type="button"
              onClick={openContact}
              className="font-display shrink-0 cursor-pointer rounded-full bg-ink px-6 py-3 text-sm font-bold text-bg transition hover:scale-[1.03]"
            >
              contact me!
            </button>
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
