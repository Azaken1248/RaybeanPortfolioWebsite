import { usePortfolio } from "../content/usePortfolio"

export function SiteFooter() {
  const { footer } = usePortfolio()
  const year = String(new Date().getFullYear())

  return (
    <footer className="mx-auto mt-20 max-w-7xl px-4 pb-12 sm:px-6">
      <div className="border-t border-periwinkle/60 pt-8">
        <p className="font-body text-sm text-ink/70">
          {footer.copyright.replace("{year}", year)}
        </p>

        {footer.tagline && (
          <p className="font-body mt-1 text-sm text-ink/70">{footer.tagline}</p>
        )}

        {footer.credit && (
          <p className="font-body mt-3 text-xs text-ink/55">
            {footer.credit.prefix}{" "}
            {footer.credit.href ? (
              <a
                href={footer.credit.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-ink/75 underline underline-offset-2"
              >
                {footer.credit.name}
              </a>
            ) : (
              <span className="font-semibold text-ink/75">
                {footer.credit.name}
              </span>
            )}
          </p>
        )}
      </div>
    </footer>
  )
}
