"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Package } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { stores, storeStockTabs, storeStockItems } from "@/lib/dealer-data"
import { cn } from "@/lib/utils"

export function StoreStockScreen() {
  const params = useSearchParams()
  const id = params.get("id")
  const store = stores.find((s) => s.id === id) ?? stores[0]
  const [tab, setTab] = useState<string>(storeStockTabs[0])

  const list = useMemo(
    () => (tab === "全部" ? storeStockItems : storeStockItems.filter((s) => s.series === tab)),
    [tab],
  )

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={`${store.name} · 库存`} />

        <div className="no-scrollbar flex shrink-0 items-center gap-1 overflow-x-auto border-b border-black/[0.06] bg-white px-2 text-[13px]">
          {storeStockTabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "relative shrink-0 px-3 py-3 font-medium transition-colors",
                tab === t ? "text-brand" : "text-muted-foreground",
              )}
            >
              {t}
              {tab === t && <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-brand" />}
            </button>
          ))}
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-3">
            {list.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 card-soft">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                  <Package className="h-8 w-8 text-brand" strokeWidth={1.6} />
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-[14px] font-semibold text-ink">{s.name}</span>
                  <span className="mt-1 text-[12px] text-muted-foreground">{s.spec}</span>
                  <span className="mt-1.5 text-[13px] text-ink">
                    库存 <span className="text-lg font-black text-brand tabular-nums">{s.stock}</span> {s.unit}
                  </span>
                </div>
              </div>
            ))}
            {list.length === 0 && (
              <p className="py-16 text-center text-[13px] text-muted-foreground">该系列暂无库存</p>
            )}
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}
