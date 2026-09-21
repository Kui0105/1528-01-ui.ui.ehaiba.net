"use client"

import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { salesProvinces, type SalesMetric } from "@/lib/points-mall-data"

export function SalesScreen() {
  const router = useRouter()

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="销售数据" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-3">
            {salesProvinces.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => router.push(`/sales-region?pid=${p.id}`)}
                className="rounded-2xl bg-white p-4 text-left card-soft active:bg-black/[0.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-ink">{p.name}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <RegionMetric metric={p.metric} />
              </button>
            ))}
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}

export function RegionMetric({ metric }: { metric: SalesMetric }) {
  return (
    <div className="mt-3 flex items-center border-t border-black/[0.06] pt-3">
      <Metric label="经销商" value={metric.dealers} />
      <Metric label="业务员" value={metric.salesmen} border />
      <Metric label="门店" value={metric.stores} border />
    </div>
  )
}

function Metric({ label, value, border }: { label: string; value: number; border?: boolean }) {
  return (
    <div className={`flex flex-1 flex-col items-center ${border ? "border-l border-black/[0.06]" : ""}`}>
      <span className="text-xl font-black text-brand tabular-nums">{value}</span>
      <span className="mt-1 text-[12px] text-muted-foreground">{label}</span>
    </div>
  )
}
