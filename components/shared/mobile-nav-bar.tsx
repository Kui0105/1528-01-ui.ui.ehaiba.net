"use client"

import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

// 通用白底顶栏：状态栏 + 标题栏 + 返回键（复用于分类/详情/记录/规则/消息等页）
export function MobileNavBar({
  title,
  onBack,
  right,
  variant = "light",
  titleColor,
}: {
  title: string
  onBack?: () => void
  right?: ReactNode
  variant?: "light" | "transparent"
  titleColor?: string
}) {
  const router = useRouter()
  const light = variant === "light"

  return (
    <header className={light ? "shrink-0 bg-white" : "shrink-0"}>
      {/* 状态栏 */}
      <div
        className={`flex items-center justify-between px-4 pt-2.5 text-[13px] font-medium tabular-nums ${
          light ? "text-ink" : "text-white"
        }`}
      >
        <span>10:25</span>
        <span className="flex items-center gap-1.5">
          <span
            className={`inline-block h-2.5 w-3.5 rounded-[2px] ${light ? "bg-ink/80" : "bg-white/80"}`}
            aria-hidden
          />
          <span
            className={`inline-block h-2.5 w-5 rounded-[3px] border ${light ? "border-ink/60" : "border-white/70"}`}
            aria-hidden
          />
        </span>
      </div>

      {/* 标题栏 */}
      <div
        className={`relative flex h-11 items-center justify-center px-3 ${
          light ? "border-b border-black/[0.06]" : ""
        }`}
      >
        <button
          type="button"
          aria-label="返回"
          onClick={onBack ?? (() => router.back())}
          className={`absolute left-2 flex h-9 w-9 items-center justify-center rounded-full transition active:scale-90 ${
            light ? "text-ink" : "text-white"
          }`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span
          className={`text-[17px] font-semibold ${light ? "text-ink" : "text-white"}`}
          style={titleColor ? { color: titleColor } : undefined}
        >
          {title}
        </span>
        <div className="absolute right-2 flex items-center">
          {right ?? (
            <span
              className={`flex h-9 items-center rounded-full border backdrop-blur ${
                light ? "border-black/10 bg-black/[0.03]" : "border-white/40 bg-white/10"
              }`}
            >
              <span className="px-2.5 text-xs tracking-widest">•••</span>
              <span className={`h-4 w-px ${light ? "bg-black/10" : "bg-white/40"}`} aria-hidden />
              <span className="flex items-center justify-center px-2.5">
                <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-ink/70" : "bg-white"}`} aria-hidden />
              </span>
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
