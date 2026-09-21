"use client"

import { useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { activationRecords, stores } from "@/lib/dealer-data"

const storeOptions = ["全部门店", ...stores.map((s) => s.name)]

export function ProductDetailScreen() {
  const [store, setStore] = useState("全部门店")
  const [picker, setPicker] = useState(false)

  const list = useMemo(
    () => (store === "全部门店" ? activationRecords : activationRecords.filter((r) => r.store === store)),
    [store],
  )

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="产品明细" />

        {/* 筛选 */}
        <div className="flex shrink-0 gap-3 bg-white px-3 py-3">
          <button
            type="button"
            onClick={() => setPicker(true)}
            className="flex flex-1 flex-col rounded-xl bg-muted px-3 py-2 text-left"
          >
            <span className="text-[11px] text-muted-foreground">门店</span>
            <span className="mt-0.5 flex items-center justify-between text-[13px] text-ink">
              {store}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </span>
          </button>
          <div className="flex flex-1 flex-col rounded-xl bg-muted px-3 py-2">
            <span className="text-[11px] text-muted-foreground">时间段</span>
            <span className="mt-0.5 flex items-center justify-between text-[13px] text-ink">
              全部时间
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </span>
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto">
          {list.map((r) => (
            <div key={r.id} className="border-b border-black/[0.05] bg-white px-4 py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-ink">{r.store}</span>
                <span className="text-[12px] text-muted-foreground tabular-nums">{r.time}</span>
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground">{r.spec}</p>
              <span className="mt-2 inline-block rounded bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">
                {r.status}
              </span>
            </div>
          ))}
        </main>

        {/* 门店选择器 */}
        {picker && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setPicker(false)}>
            <div className="rounded-t-2xl bg-white pb-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">选择门店</span>
                <button type="button" onClick={() => setPicker(false)} className="text-[13px] text-muted-foreground">
                  取消
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {storeOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setStore(s)
                      setPicker(false)
                    }}
                    className={`flex w-full items-center px-4 py-3 text-left text-[14px] active:bg-black/[0.03] ${
                      store === s ? "font-semibold text-brand" : "text-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}
