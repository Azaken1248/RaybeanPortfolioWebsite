import type { ReactNode } from "react"
import { defaultPortfolio } from "./portfolio"
import type { PortfolioData } from "./types"
import { PortfolioContext } from "./usePortfolio"

type PortfolioProviderProps = {
  children: ReactNode
  data?: PortfolioData
}

/**
 * Feeds the content context. Whether `data` came from the hardcoded file or the
 * admin API is not something anything below here can observe.
 */
export function PortfolioProvider({ children, data }: PortfolioProviderProps) {
  return (
    <PortfolioContext.Provider value={data ?? defaultPortfolio}>
      {children}
    </PortfolioContext.Provider>
  )
}
