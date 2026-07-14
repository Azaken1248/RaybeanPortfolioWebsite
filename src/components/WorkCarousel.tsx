import { useCallback, useEffect, useRef, useState } from "react"
import type { WorkItem } from "../content/types"
import { Icon } from "./Icon"
import { WorkImage } from "./WorkImage"

type WorkCarouselProps = {
  works: WorkItem[]
}

type CarouselArrowProps = {
  direction: "left" | "right"
  onClick: () => void
  disabled: boolean
}

/**
 * Solid ink, like every other button on the site. A tinted circle here washes
 * out to roughly 1.2:1 against the white card behind it, which is why the first
 * version read as decoration rather than a control.
 */
function CarouselArrow({ direction, onClick, disabled }: CarouselArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className="grid size-11 cursor-pointer place-items-center rounded-full bg-ink text-bg shadow-nav transition duration-200 hover:scale-110 disabled:cursor-default disabled:bg-periwinkle/60 disabled:text-ink/45 disabled:shadow-none disabled:hover:scale-100"
    >
      <Icon
        name="chevron-down"
        size={20}
        className={direction === "left" ? "rotate-90" : "-rotate-90"}
      />
    </button>
  )
}

/**
 * A manually-scrolled carousel. Cloudy's version is a CSS marquee that drifts on
 * its own; this one never moves unless the visitor moves it — by dragging, by
 * flicking on touch, or with the arrows.
 *
 * Note there is no `scroll-smooth` class on the scroller. Smooth scrolling would
 * fight the drag handler, which sets scrollLeft directly and needs it to land
 * immediately. The arrows opt into smoothness per-call instead.
 */
export function WorkCarousel({ works }: WorkCarouselProps) {
  const scroller = useRef<HTMLUListElement>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })
  const [dragging, setDragging] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const syncArrows = useCallback(() => {
    const el = scroller.current
    if (!el) return
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    syncArrows()
    window.addEventListener("resize", syncArrows)
    return () => window.removeEventListener("resize", syncArrows)
  }, [syncArrows, works.length])

  const page = (direction: -1 | 1) => {
    const el = scroller.current
    if (!el) return
    const card = el.querySelector("li")
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  // Drag is mouse-only. Touch already has native momentum scrolling, and
  // hijacking it with pointer capture would make it worse, not better.
  const onPointerDown = (event: React.PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse") return
    const el = scroller.current
    if (!el) return
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: el.scrollLeft,
    }
    setDragging(true)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return
    const el = scroller.current
    if (!el) return
    event.preventDefault()
    el.scrollLeft =
      drag.current.startScroll - (event.clientX - drag.current.startX)
  }

  const endDrag = () => {
    drag.current.active = false
    setDragging(false)
  }

  if (works.length === 0) return null

  return (
    <div>
      {/*
        The edge fades are scoped to the scroller alone. Wrapping the arrows in
        here too would let the right-hand fade paint white over them.
      */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent sm:w-16" />

        <ul
          ref={scroller}
          onScroll={syncArrows}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 py-8 ${
            dragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        >
          {works.map((work, index) => {
            // Alternating tilt, straightened on hover — the scrapbook feel from
            // the reference, without the automatic drift.
            const tilt =
              index % 2 === 0 ? "-rotate-[1.5deg]" : "rotate-[1.5deg]"

            return (
              <li
                key={work.id}
                className="w-[16rem] shrink-0 snap-center sm:w-[20rem] lg:w-[23rem]"
              >
                <article
                  className={`group relative rounded-[2rem] border border-periwinkle/50 bg-surface p-3 shadow-nav transition-all duration-500 hover:rotate-0 hover:scale-[1.02] hover:shadow-soft ${tilt}`}
                >
                  <div className="pointer-events-none absolute inset-1.5 rounded-[1.7rem] border border-dashed border-lavender/50" />
                  <div className="pointer-events-none absolute -top-1.5 left-1/2 h-4 w-16 -translate-x-1/2 -rotate-2 border-x border-lavender/40 bg-periwinkle/60 opacity-90" />

                  <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-lavender/40 to-periwinkle/40">
                    <WorkImage
                      work={work}
                      className="pointer-events-none size-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-5 right-5 text-sm text-lavender opacity-80"
                  >
                    ✦
                  </span>

                  <div className="px-2 pt-4 pb-1">
                    <p className="font-display text-sm font-bold text-ink">
                      {work.artist && (
                        <span className="font-semibold text-ink/55">
                          {work.artist} -{" "}
                        </span>
                      )}
                      {work.title}
                    </p>

                    {work.tags && work.tags.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {work.tags.map((tag) => (
                          <li
                            key={tag}
                            className="font-body rounded-full bg-periwinkle/45 px-2.5 py-0.5 text-xs font-semibold text-ink/85"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-2 flex items-center justify-end gap-2">
        <CarouselArrow
          direction="left"
          onClick={() => page(-1)}
          disabled={atStart}
        />
        <CarouselArrow
          direction="right"
          onClick={() => page(1)}
          disabled={atEnd}
        />
      </div>
    </div>
  )
}
