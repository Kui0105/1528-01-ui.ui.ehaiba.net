"use client"

import { useSearchParams } from "next/navigation"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { stores, storeChangeLogs, type StoreChangeLog } from "@/lib/dealer-data"

const typeStyle: Record<StoreChangeLog["type"], string> = {
  "新增/激活产品": "border-brand/40 text-brand",
  兑奖核销: "border-[#e6a23c]/50 text-[#e6a23c]",
  产品回收: "border-[#3fae6f]/50 text-[#3fae6f]",
}

export function StoreLogsScreen() {
  const params = useSearchParams()
  const id = params.get("id")
  const store = stores.find((s) => s.id === id) ?? stores[0]

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={`${store.name} · 变动记录`} />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-3">
            {storeChangeLogs.map((log) => (
              <div key={log.id} className="rounded-2xl bg-white p-4 card-soft">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex-1 text-[15px] font-semibold text-ink">{log.title}</span>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${typeStyle[log.type]}`}>
                    {log.type}
                  </span>
                </div>
                <span className="mt-2 block text-[12px] text-muted-foreground tabular-nums">{log.date}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}
