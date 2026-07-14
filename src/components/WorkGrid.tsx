import type { WorkGroup, WorkItem } from "../content/types"
import { WorkCard } from "./WorkCard"

/** Everything except "carousel" — that has its own component. Narrowing here
 *  means the compiler rejects handing a carousel group to the grid. */
export type GridLayout = Exclude<WorkGroup["layout"], "carousel">

type WorkGridProps = {
  works: WorkItem[]
  layout?: GridLayout
  className?: string
}

// Illustration wants three narrower columns; everything else reads better as
// two wide 16:9 tiles, which is how the reference lays out Featured Works.
const COLUMNS: Record<GridLayout, string> = {
  grid: "sm:grid-cols-2",
  "video-grid": "sm:grid-cols-2",
  masonry: "sm:grid-cols-2 lg:grid-cols-3",
}

export function WorkGrid({ works, layout = "grid", className }: WorkGridProps) {
  if (works.length === 0) return null

  return (
    <ul className={`grid gap-5 sm:gap-6 ${COLUMNS[layout]} ${className ?? ""}`}>
      {works.map((work) => (
        <li key={work.id}>
          <WorkCard work={work} />
        </li>
      ))}
    </ul>
  )
}
