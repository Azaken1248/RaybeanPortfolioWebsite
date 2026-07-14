import { createContext, useContext, useEffect, useState } from "react"
import { mapApiToPortfolio } from "./adapter"
import { fetchPortfolio, isApiEnabled } from "./api"
import type { ApiPortfolioResponse } from "./apiTypes"
import { defaultPortfolio } from "./portfolio"
import type { PortfolioData } from "./types"

export const PortfolioContext = createContext<PortfolioData>(defaultPortfolio)

/** The only way a component is allowed to read content. */
export function usePortfolio(): PortfolioData {
  return useContext(PortfolioContext)
}

type FetchState = {
  data: PortfolioData | null
  isLoading: boolean
  error: Error | null
}

/**
 * Loads content.
 *
 * With no API configured (today) this returns the hardcoded content
 * immediately — no request, no loading flash. Once VITE_PORTFOLIO_API_URL is
 * set it fetches, and still falls back to the hardcoded content on failure, so
 * the site can never render blank because the API is down.
 */
export function usePortfolioFetch(): FetchState & { data: PortfolioData } {
  const [state, setState] = useState<FetchState>({
    data: null,
    isLoading: isApiEnabled(),
    error: null,
  })

  useEffect(() => {
    if (!isApiEnabled()) return

    let cancelled = false

    fetchPortfolio()
      .then((raw) => {
        if (cancelled) return
        const mapped = mapApiToPortfolio(raw as ApiPortfolioResponse["data"])
        setState({ data: mapped, isLoading: false, error: null })
      })
      .catch((err: Error) => {
        if (cancelled) return
        console.warn("Portfolio API fetch failed, using local content:", err)
        setState({ data: null, isLoading: false, error: err })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return {
    data: state.data ?? defaultPortfolio,
    isLoading: state.isLoading,
    error: state.error,
  }
}
