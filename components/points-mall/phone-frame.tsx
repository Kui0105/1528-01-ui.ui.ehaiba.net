import type { ReactNode } from "react"

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-muted px-0 py-0 sm:items-center sm:px-4 sm:py-8">
      <div className="relative w-full max-w-[420px] overflow-hidden bg-background shadow-none sm:rounded-[2.5rem] sm:shadow-[0_30px_80px_-20px_rgba(26,26,26,0.35)] sm:ring-1 sm:ring-black/5">
        <div className="relative flex h-[100dvh] flex-col sm:h-[860px]">{children}</div>
      </div>
    </div>
  )
}
