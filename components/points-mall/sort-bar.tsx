"use client"

import { sortTabs } from "@/lib/points-mall-data"
import { cn } from "@/lib/utils"

export type SortDir = "desc" | "asc"

// 综合 / 销量 / 价格 平均分布；销量、价格带升降序 ICON，点击在高→低 / 低→高 之间切换
export function SortBar({
  active,
  dir,
  onChange,
}: {
  active: number
  dir: SortDir
  onChange: (index: number, dir: SortDir) => void
}) {
  function handle(i: number) {
    if (i === 0) {
      onChange(0, dir)
      return
    }
    if (i === active) {
      onChange(i, dir === "desc" ? "asc" : "desc")
    } else {
      onChange(i, "desc")
    }
  }

  return (
    <div className="flex shrink-0 items-center border-b border-black/[0.06] bg-white text-sm">
      {sortTabs.map((t, i) => {
        const isActive = active === i
        return (
          <button
            key={t}
            type="button"
            onClick={() => handle(i)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1 py-3 font-medium transition-colors",
              isActive ? "text-brand" : "text-muted-foreground",
            )}
          >
            {t}
            {i > 0 && (
              <span className="flex flex-col leading-none" aria-hidden>
                <span
                  className={cn(
                    "text-[9px]",
                    isActive && dir === "asc" ? "text-brand" : "text-muted-foreground/40",
                  )}
                >
                  ▲
                </span>
                <span
                  className={cn(
                    "-mt-[3px] text-[9px]",
                    isActive && dir === "desc" ? "text-brand" : "text-muted-foreground/40",
                  )}
                >
                  ▼
                </span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
