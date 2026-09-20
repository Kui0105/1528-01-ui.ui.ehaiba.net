"use client"

import { Home, MessageCircle, User, ScanLine } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

type TabKey = "home" | "message" | "profile"

const tabs: { key: TabKey; label: string; icon: typeof Home; href: string; badge?: boolean }[] = [
  { key: "home", label: "首页", icon: Home, href: "/" },
  { key: "message", label: "消息", icon: MessageCircle, href: "/message", badge: true },
  { key: "profile", label: "我的", icon: User, href: "/profile" },
]

export function BottomNav({ active = "home" }: { active?: TabKey }) {
  const router = useRouter()
  return (
    <>
      {/* 扫码悬浮按钮 */}
      <button
        type="button"
        onClick={() => router.push("/lottery")}
        aria-label="扫码抽奖"
        className="brand-gradient glow-brand absolute -top-16 right-4 flex h-14 w-14 items-center justify-center rounded-full text-white ring-4 ring-white/70"
      >
        <ScanLine className="h-6 w-6" />
      </button>

      <nav className="flex items-stretch justify-around gap-1 rounded-full border border-white/60 bg-white/70 px-3 py-2 shadow-[0_10px_30px_-10px_rgba(26,26,26,0.35)] backdrop-blur-xl">
        {tabs.map((t) => {
          const Icon = t.icon
          const isActive = t.key === active
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => router.push(t.href)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-full px-3 py-1 text-[11px] transition-colors",
                isActive ? "text-brand" : "text-muted-foreground",
              )}
            >
              <span className="relative">
                <Icon className={cn("h-5 w-5", isActive && "fill-brand/10")} />
                {t.badge && <span className="absolute -right-1.5 -top-0.5 h-2 w-2 rounded-full bg-brand" />}
              </span>
              {t.label}
            </button>
          )
        })}
      </nav>
    </>
  )
}
