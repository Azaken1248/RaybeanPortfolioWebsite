import { createContext, useContext } from "react"

/**
 * Lets anything on the page open the contact modal — the nav button, the hero's
 * Discord icon, the commissions notice — without prop-drilling through layout.
 */
export const ContactModalContext = createContext<{ open: () => void }>({
  open: () => {},
})

export function useContactModal() {
  return useContext(ContactModalContext)
}
