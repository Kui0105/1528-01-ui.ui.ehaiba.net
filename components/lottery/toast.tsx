"use client"

export function Toast({ message }: { message: string }) {
  if (!message) return null

  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-50 flex -translate-y-1/2 justify-center">
      <div className="rounded-2xl bg-black/80 px-5 py-3 text-sm text-white backdrop-blur">{message}</div>
    </div>
  )
}
