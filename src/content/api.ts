/**
 * The admin API client. Dormant today — no API exists yet.
 *
 * Turning it on is a flag flip: set VITE_PORTFOLIO_API_URL in .env and the app
 * starts fetching, falling back to the hardcoded content if the call fails.
 * No component changes. See docs/architecture.md §7.
 */

const API_BASE = import.meta.env.VITE_PORTFOLIO_API_URL ?? ""

export function isApiEnabled(): boolean {
  return API_BASE.length > 0
}

export async function fetchPortfolio(): Promise<unknown> {
  const res = await fetch(`${API_BASE}/portfolio`)

  if (!res.ok) {
    throw new Error(`Portfolio API responded with ${res.status}`)
  }

  const json = await res.json()

  if (!json.success) {
    throw new Error(json.error?.message ?? "Unknown API error")
  }

  return json.data
}
