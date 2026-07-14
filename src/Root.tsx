import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { LoadingSkeleton } from "./components/LoadingSkeleton"
import { PortfolioProvider } from "./content/PortfolioProvider"
import { usePortfolioFetch } from "./content/usePortfolio"

export function Root() {
  const { data, isLoading } = usePortfolioFetch()

  // Only ever true once an API is configured; today content is synchronous.
  if (isLoading) return <LoadingSkeleton />

  return (
    <PortfolioProvider data={data}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PortfolioProvider>
  )
}
