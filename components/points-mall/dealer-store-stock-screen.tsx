"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { storeStockTabs, storeStockItems } from "@/lib/dealer-data"
import { cn } from "@/lib/utils"

export function DealerStoreStockScreen() {
  const params = useSearchParams()
  const name = params.get("name") ?? "门店"
  const [tab, setTab] = useState<string>(storeStockTabs[0])

  const list = useMemo(
    () => (tab === "全部" ? storeStockItems : storeStockItems.filter((s) => s.series === tab)),
    [tab],
  )

  const total = useMemo(() => storeStockItems.reduce((sum, s) => sum + s.stock, 0), [])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={`${name} · 库存`} />

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

        <div className="shrink-0 bg-white px-4 pb-2.5 pt-2 text-[12px] text-muted-foreground">
          共 <b className="text-ink tabular-nums">{storeStockItems.length}</b> 种商品 · 库存合计{" "}
          <b className="text-brand tabular-nums">{total}</b> 件
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-3">
            {list.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 card-soft">
                <img
                  src={s.image || "/placeholder.svg"}
                  alt={s.name}
                  className="h-16 w-16 shrink-0 rounded-xl bg-white object-contain"
                />
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
