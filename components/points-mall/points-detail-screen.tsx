"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { PhoneFrame } from "./phone-frame"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { pointsBalance, pointsRecords } from "@/lib/points-mall-data"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { key: "all", label: "全部" },
  { key: "earn", label: "积分获得" },
  { key: "deduct", label: "积分扣减" },
]

export function PointsDetailScreen() {
  const router = useRouter()
  const [tab, setTab] = useState("all")

  const list = useMemo(() => {
    if (tab === "earn") return pointsRecords.filter((r) => r.amount > 0)
    if (tab === "deduct") return pointsRecords.filter((r) => r.amount < 0)
    return pointsRecords
  }, [tab])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        {/* 品牌红头部 + 积分余额 */}
        <div className="brand-gradient shrink-0 text-white">
          <StatusBar dark />
          <div className="relative flex h-11 items-center justify-center px-3">
            <button
              type="button"
              aria-label="返回"
              onClick={() => router.back()}
              className="absolute left-2 flex h-9 w-9 items-center justify-center rounded-full text-white active:scale-90"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-[17px] font-semibold">积分明细</span>
            <div className="absolute right-2">
              <Capsule dark />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 pb-6 pt-2">
            <span className="text-[12px] text-white/80">当前可用积分</span>
            <span className="text-4xl font-black tabular-nums">{pointsBalance.toLocaleString()}</span>
          </div>
        </div>

        {/* Tab */}
        <div className="flex shrink-0 items-center border-b border-black/[0.06] bg-white text-[13px]">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "relative flex-1 py-3 font-medium transition-colors",
                tab === t.key ? "text-brand" : "text-muted-foreground",
              )}
            >
              {t.label}
              {tab === t.key && <span className="absolute inset-x-8 bottom-1 h-0.5 rounded-full bg-brand" />}
            </button>
          ))}
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto">
          {list.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between border-b border-black/[0.05] bg-white px-4 py-3.5"
            >
              <div className="flex flex-col">
                <span className="text-[14px] text-ink">{r.title}</span>
                <span className="mt-1 text-[12px] text-muted-foreground tabular-nums">{r.time}</span>
              </div>
              <span
                className={cn(
                  "text-lg font-black tabular-nums",
                  r.amount > 0 ? "text-brand" : "text-ink",
                )}
              >
                {r.amount > 0 ? `+${r.amount}` : r.amount}
              </span>
            </div>
          ))}
        </main>
      </div>
    </PhoneFrame>
  )
}
