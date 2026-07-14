import { Navigate, Route, Routes } from "react-router-dom"
import { usePortfolio } from "./content/usePortfolio"
import { SiteLayout } from "./layout/SiteLayout"
import { CommissionsPage } from "./pages/CommissionsPage"
import { DisciplinePage } from "./pages/DisciplinePage"
import { HomePage } from "./pages/HomePage"

function App() {
  const { disciplines } = usePortfolio()

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />

        {/* Discipline routes come from the content layer, not a hardcoded list. */}
        {disciplines.map((discipline) => (
          <Route
            key={discipline.id}
            path={discipline.route}
            element={<DisciplinePage disciplineId={discipline.id} />}
          />
        ))}

        <Route path="/commissions" element={<CommissionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
