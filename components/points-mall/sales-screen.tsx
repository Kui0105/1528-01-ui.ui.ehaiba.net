"use client"

import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { salesData } from "@/lib/points-mall-data"

export function SalesScreen() {
  const router = useRouter()

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="销售数据" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-3">
            {salesData.map((s) => (
              <button
                key={s.store}
                type="button"
                onClick={() => router.push("/sales-region")}
                className="rounded-2xl bg-white p-4 text-left card-soft active:bg-black/[0.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-ink">{s.store}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-3 flex items-center">
                  <Metric label="订单数" value={s.order} />
                  <Metric label="激活数" value={s.active} border />
                  <Metric label="兑奖数" value={s.amount} border />
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}

function Metric({ label, value, border }: { label: string; value: number; border?: boolean }) {
  return (
    <div className={`flex flex-1 flex-col items-center ${border ? "border-l border-black/[0.06]" : ""}`}>
      <span className="text-xl font-black text-brand">{value}</span>
      <span className="mt-1 text-[12px] text-muted-foreground">{label}</span>
    </div>
  )
}
