/*
 * TEMPORARY — Step 0 foundation check.
 * Replaced entirely by the layout shell and route table in Step 2.
 */

const swatches = [
  { name: "bg", hex: "#F7F7F7", className: "bg-bg", note: "page background" },
  { name: "surface", hex: "#FFFFFF", className: "bg-surface", note: "cards" },
  { name: "ink", hex: "#464646", className: "bg-ink", note: "text + dark button" },
  { name: "lavender", hex: "#B2ABC0", className: "bg-lavender", note: "accent — surfaces only" },
  { name: "periwinkle", hex: "#BDC2CF", className: "bg-periwinkle", note: "tinted surfaces" },
  { name: "cream", hex: "#ECEAD9", className: "bg-cream", note: "optional warm accent" },
]

function App() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-body text-sm font-semibold tracking-widest text-ink/60 uppercase">
        Step 0 — Foundation
      </p>
      <h1 className="font-display mt-2 text-4xl text-ink">
        Tokens and fonts are live.
      </h1>
      <p className="font-body mt-4 max-w-prose text-lg text-ink/80">
        This heading is Poppins and this paragraph is Nunito. If the two look
        different, the fonts loaded. If the page is off-white rather than pure
        white, the background token resolved.
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {swatches.map((swatch) => (
          <li
            key={swatch.name}
            className="overflow-hidden rounded-2xl border border-periwinkle/60 bg-surface"
          >
            <div className={`h-16 w-full ${swatch.className}`} />
            <div className="px-3 py-2">
              <p className="font-display text-sm font-semibold text-ink">
                {swatch.name}
              </p>
              <p className="font-body text-xs text-ink/70">{swatch.hex}</p>
              <p className="font-body mt-1 text-xs text-ink/60">{swatch.note}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="font-display cursor-pointer rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105"
        >
          Contact Me!
        </button>
        <span className="font-body rounded-full bg-periwinkle px-4 py-2 text-sm font-semibold text-ink">
          ink on periwinkle — 5.3:1, AA pass
        </span>
      </div>
    </main>
  )
}

export default App
