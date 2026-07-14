import type { DisciplineId, PortfolioData, WorkItem } from "./types"

/**
 * Views derived from the flat works[] list.
 *
 * Sections call these — they never filter arrays inline. When works start
 * arriving from the API already filtered and sorted, this is the only file
 * that has to change.
 */

const bySortOrder = (a: WorkItem, b: WorkItem) => a.sortOrder - b.sortOrder

export function getDiscipline(data: PortfolioData, id: string) {
  return data.disciplines.find((discipline) => discipline.id === id)
}

export function getWorksByGroup(
  data: PortfolioData,
  disciplineId: DisciplineId,
  groupId: string,
): WorkItem[] {
  return data.works
    .filter(
      (work) => work.discipline === disciplineId && work.group === groupId,
    )
    .sort(bySortOrder)
}

export function getFeaturedWorks(data: PortfolioData, limit?: number) {
  const featured = data.works.filter((work) => work.featured).sort(bySortOrder)
  return limit ? featured.slice(0, limit) : featured
}
