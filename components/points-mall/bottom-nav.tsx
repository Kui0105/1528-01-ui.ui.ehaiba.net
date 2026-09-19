"use client"

import { Home, MessageCircle, User, ScanLine } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  { key: "home", label: "首页", icon: Home, active: true, action: () => console.log("[v0] 当前在积分商城首页") },
  { key: "message", label: "消息", icon: MessageCircle, active: false, action: () => console.log("[v0] navigate to message.html"), badge: true },
  { key: "profile", label: "我的", icon: User, active: false, action: () => console.log("[v0] navigate to profile.html") },
]

export function BottomNav() {
  const router = useRouter()
  return (
    <>
      {/* 扫码悬浮按钮 */}
      <button
        type="button"
        onClick={() => router.push("/lottery")}
        aria-label="扫码"
        className="brand-gradient glow-brand absolute -top-16 right-4 flex h-14 w-14 items-center justify-center rounded-full text-white ring-4 ring-white/70"
      >
        <ScanLine className="h-6 w-6" />
      </button>

      <nav className="flex items-stretch justify-around gap-1 rounded-full border border-white/60 bg-white/70 px-3 py-2 shadow-[0_10px_30px_-10px_rgba(26,26,26,0.35)] backdrop-blur-xl">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              type="button"
              onClick={t.action}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-full px-3 py-1 text-[11px] transition-colors",
                t.active ? "text-brand" : "text-muted-foreground",
              )}
            >
              <span className="relative">
                <Icon className={cn("h-5 w-5", t.active && "fill-brand/10")} />
                {t.badge && (
                  <span className="absolute -right-1.5 -top-0.5 h-2 w-2 rounded-full bg-brand" />
                )}
              </span>
              {t.label}
            </button>
          )
        })}
      </nav>
    </>
  )
}
