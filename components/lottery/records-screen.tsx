"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { PhoneFrame } from "@/components/points-mall/phone-frame"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { lotteryRecords } from "@/lib/points-mall-data"

export function RecordsScreen() {
  const router = useRouter()

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        {/* 白底头部 */}
        <div className="shrink-0 bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.05)]">
          <StatusBar />
          <div className="relative flex h-11 items-center justify-center">
            <button
              type="button"
              aria-label="返回"
              onClick={() => router.back()}
              className="absolute left-3 flex h-9 w-9 items-center justify-center rounded-full text-ink active:scale-90"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-[17px] font-semibold">中奖记录</span>
            <div className="absolute right-3">
              <Capsule />
            </div>
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          <ul className="space-y-3">
            {lotteryRecords.map((r) => (
              <li key={r.id} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 card-soft">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                  <img
                    src={r.image || "/placeholder.svg"}
                    alt={r.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold text-ink">{r.title}</span>
                  <span className="mt-1 text-[12px] text-muted-foreground">活动ID：{r.orderId}</span>
                  <span className="mt-0.5 text-[12px] text-muted-foreground">中奖时间：{r.time}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="py-5 text-center text-[12px] text-muted-foreground">没有更多记录了</p>
        </main>
      </div>
    </PhoneFrame>
  )
}
