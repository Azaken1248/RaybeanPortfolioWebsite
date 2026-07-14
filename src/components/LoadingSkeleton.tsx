/**
 * Only ever shown when an API is configured and the request is in flight.
 * With today's hardcoded content the app renders immediately and this is
 * never mounted.
 */
export function LoadingSkeleton() {
  return (
    <div className="grid min-h-screen place-items-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="size-14 animate-pulse rounded-full bg-lavender/50" />
        <p className="font-display text-sm font-semibold text-ink/60">
          loading…
        </p>
      </div>
    </div>
  )
}
