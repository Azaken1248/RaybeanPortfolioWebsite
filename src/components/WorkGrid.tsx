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

export function WorkGrid({ works, layout = "grid", className }: WorkGridProps) {
  if (works.length === 0) return null

  // Masonry uses CSS columns so illustrations of different heights pack
  // together at their natural aspect ratio, rather than being cropped to a
  // shared 16:9. The grids stay a plain two-up of uniform tiles.
  if (layout === "masonry") {
    return (
      <ul
        className={`columns-1 gap-5 sm:columns-2 sm:gap-6 lg:columns-3 ${className ?? ""}`}
      >
        {works.map((work) => (
          <li key={work.id} className="mb-5 break-inside-avoid sm:mb-6">
            <WorkCard work={work} aspect="natural" />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={`grid gap-5 sm:grid-cols-2 sm:gap-6 ${className ?? ""}`}>
      {works.map((work) => (
        <li key={work.id}>
          <WorkCard work={work} />
        </li>
      ))}
    </ul>
  )
}
