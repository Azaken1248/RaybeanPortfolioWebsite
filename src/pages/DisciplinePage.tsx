import { Navigate } from "react-router-dom"
import { RichText } from "../components/RichText"
import { SectionHeading } from "../components/SectionHeading"
import { WorkCarousel } from "../components/WorkCarousel"
import { WorkGrid } from "../components/WorkGrid"
import { getDiscipline, getWorksByGroup } from "../content/selectors"
import type { DisciplineId } from "../content/types"
import { usePortfolio } from "../content/usePortfolio"

type DisciplinePageProps = {
  disciplineId: DisciplineId
}

/**
 * One component for all three disciplines. It renders whatever the content layer
 * describes for the discipline named in the route, so adding a fourth is a
 * content edit and nothing else — see docs/architecture.md §5.
 *
 * Each group picks its own presentation through `layout`, so a section can be a
 * carousel or a grid without a new page component.
 */
export function DisciplinePage({ disciplineId }: DisciplinePageProps) {
  const data = usePortfolio()
  const discipline = getDiscipline(data, disciplineId)

  if (!discipline) return <Navigate to="/" replace />

  return (
    <>
      <header className="pt-6 pb-2 text-center sm:pt-12">
        <h1 className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl">
          {discipline.section.title}
        </h1>

        {discipline.section.description && (
          <p className="font-body mx-auto mt-3 max-w-2xl text-ink/75">
            {discipline.section.description}
          </p>
        )}

        {discipline.toolsNote && (
          <RichText
            text={discipline.toolsNote}
            className="font-body mx-auto mt-4 max-w-2xl text-sm text-ink/70"
          />
        )}
      </header>

      <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-14">
        {discipline.groups.map((group) => {
          const works = getWorksByGroup(data, discipline.id, group.id)

          return (
            <section
              key={group.id}
              className="rounded-card bg-surface p-6 shadow-soft sm:p-9"
            >
              <SectionHeading section={group.section} />

              {group.layout === "carousel" ? (
                <WorkCarousel works={works} />
              ) : (
                <WorkGrid
                  works={works}
                  layout={group.layout}
                  className={group.section.title ? "mt-8" : ""}
                />
              )}
            </section>
          )
        })}
      </div>
    </>
  )
}
