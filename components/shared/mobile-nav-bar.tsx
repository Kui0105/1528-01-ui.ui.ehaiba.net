"use client"

import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { StatusBar, Capsule } from "./wechat-chrome"

// 通用微信小程序顶栏：状态栏 + 标题栏 + 返回键 + 胶囊按钮（复用于分类/详情/记录/规则/消息等页）
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
      <StatusBar dark={!light} />

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
        <div className="absolute right-2 flex items-center">{right ?? <Capsule dark={!light} />}</div>
      </div>
    </header>
  )
}
