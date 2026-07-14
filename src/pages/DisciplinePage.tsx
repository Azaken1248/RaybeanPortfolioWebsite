import { Navigate } from "react-router-dom"
import { Icon } from "../components/Icon"
import { SectionHeading } from "../components/SectionHeading"
import { WorkGrid } from "../components/WorkGrid"
import { getDiscipline, getWorksByGroup } from "../content/selectors"
import type { DisciplineId } from "../content/types"
import { usePortfolio } from "../content/usePortfolio"

type DisciplinePageProps = {
  disciplineId: DisciplineId
}

/**
 * One component for all three disciplines. It renders whatever the content
 * layer describes, so adding a fourth discipline is a content edit and nothing
 * else — see docs/architecture.md §5.
 *
 * The work grids land in Step 3/4; today each group renders its heading.
 */
export function DisciplinePage({ disciplineId }: DisciplinePageProps) {
  const data = usePortfolio()
  const discipline = getDiscipline(data, disciplineId)

  if (!discipline) return <Navigate to="/" replace />

  return (
    <>
      <header className="pt-4 pb-2 sm:pt-8">
        <h1 className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl">
          {discipline.section.title}
        </h1>

        {discipline.section.description && (
          <p className="font-body mt-3 max-w-2xl text-lg text-ink/75">
            {discipline.section.description}
          </p>
        )}

        {discipline.toolsNote && (
          <p className="font-body mt-5 flex max-w-2xl items-start gap-2.5 rounded-2xl bg-periwinkle/30 px-4 py-3 text-sm text-ink/80">
            <Icon
              name="PaintBrush"
              size={16}
              className="mt-0.5 shrink-0 text-ink"
            />
            {discipline.toolsNote}
          </p>
        )}
      </header>

      {discipline.groups.map((group) => {
        const works = getWorksByGroup(data, discipline.id, group.id)

        return (
          <section key={group.id} className="mt-12 sm:mt-16">
            <SectionHeading section={group.section} />
            <WorkGrid
              works={works}
              layout={group.layout}
              className={group.section.title ? "mt-8" : ""}
            />
          </section>
        )
      })}
    </>
  )
}
