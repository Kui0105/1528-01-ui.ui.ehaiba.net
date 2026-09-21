"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { dealerPointsBalance, dealerPointsTabs, dealerPointsRecords } from "@/lib/dealer-data"
import { cn } from "@/lib/utils"

export function DealerPointsDetailScreen() {
  const router = useRouter()
  const [tab, setTab] = useState<string>(dealerPointsTabs[0])

  const list = useMemo(() => {
    if (tab === "收入") return dealerPointsRecords.filter((r) => r.amount > 0)
    if (tab === "支出") return dealerPointsRecords.filter((r) => r.amount < 0)
    return dealerPointsRecords
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
          <div className="flex flex-col gap-1 px-4 pb-6 pt-2">
            <span className="text-[12px] text-white/80">账户积分余额</span>
            <span className="text-3xl font-black tabular-nums">
              {dealerPointsBalance} <span className="text-base font-medium">分</span>
            </span>
          </div>
        </div>

        {/* Tab */}
        <div className="flex shrink-0 items-center border-b border-black/[0.06] bg-white text-[13px]">
          {dealerPointsTabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "relative flex-1 py-3 font-medium transition-colors",
                tab === t ? "text-brand" : "text-muted-foreground",
              )}
            >
              {t}
              {tab === t && <span className="absolute inset-x-10 bottom-1 h-0.5 rounded-full bg-brand" />}
            </button>
          ))}
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto">
          {list.map((r) => (
            <div key={r.id} className="flex items-center justify-between border-b border-black/[0.05] bg-white px-4 py-3.5">
              <div className="flex flex-col">
                <span className="text-[14px] text-ink">{r.title}</span>
                <span className="mt-1 text-[12px] text-muted-foreground tabular-nums">{r.time}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className={cn("text-lg font-black tabular-nums", r.amount > 0 ? "text-brand" : "text-ink")}>
                  {r.amount > 0 ? `+${r.amount.toLocaleString()}` : r.amount.toLocaleString()}
                </span>
                <span className="mt-1 text-[11px] text-muted-foreground tabular-nums">余额 {r.balance.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </main>
      </div>
    </PhoneFrame>
  )
}
