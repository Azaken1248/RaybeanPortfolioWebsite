import { useLocation } from "react-router-dom"
import { Icon } from "../components/Icon"
import { SocialRow } from "../components/SocialRow"
import { usePortfolio } from "../content/usePortfolio"
import { useContactModal } from "./contactModalContext"

export function SiteFooter() {
  const { footer } = usePortfolio()
  const { open: openContact } = useContactModal()
  const { pathname } = useLocation()

  // Home already carries the social row in its hero, so repeating it in the
  // footer there is just noise. Every other page has no hero, so it stays.
  const showSocials = pathname !== "/"

  return (
    <footer className="mx-auto mt-20 max-w-7xl px-4 pb-10 sm:px-6">
      <div
        className={`flex flex-col items-center gap-6 border-t border-periwinkle/60 pt-10 sm:flex-row ${
          showSocials ? "sm:justify-between" : "sm:justify-center"
        }`}
      >
        {showSocials && (
          <SocialRow placement="footer" onContactClick={openContact} size="sm" />
        )}

        <p className="font-body flex items-center gap-1.5 text-sm text-ink/60">
          <Icon name="Sparkle" size={14} className="text-lavender" />
          {footer.copyright.replace("{year}", String(new Date().getFullYear()))}
        </p>
      </div>
    </footer>
  )
}
