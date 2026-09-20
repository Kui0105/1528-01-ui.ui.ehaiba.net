"use client"

import { useState } from "react"
import { Store } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { dealerInfo } from "@/lib/points-mall-data"

export function DealerScreen() {
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="经销控制台" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-8">
          {/* 经销商信息 */}
          <section className="rounded-2xl bg-white p-4 card-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
                <Store className="h-7 w-7 text-brand" />
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold text-ink">{dealerInfo.name}</span>
                  <span className="rounded bg-[#3fae6f]/15 px-1.5 py-0.5 text-[11px] font-medium text-[#3fae6f]">
                    {dealerInfo.status}
                  </span>
                </div>
                <span className="mt-1 text-[12px] text-muted-foreground">{dealerInfo.region}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-brand/[0.06] px-4 py-3">
              <span className="text-[13px] text-ink">账户积分</span>
              <span className="text-lg font-black text-brand">{dealerInfo.points}</span>
            </div>
          </section>

          {/* 经营数据 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <span className="text-[14px] font-bold text-ink">经营数据</span>
            <div className="mt-4 grid grid-cols-4">
              {dealerInfo.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center ${i > 0 ? "border-l border-black/[0.06]" : ""}`}
                >
                  <span className="text-lg font-black text-brand">{s.value}</span>
                  <span className="mt-1 text-[11px] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 功能入口 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <span className="text-[14px] font-bold text-ink">功能入口</span>
            <div className="mt-4 grid grid-cols-4 gap-y-5">
              {dealerInfo.entries.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => showToast(`${e}敬请期待`)}
                  className="flex flex-col items-center gap-2 active:scale-95"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted">
                    <span className="text-[11px] font-semibold text-brand">{e.slice(0, 2)}</span>
                  </span>
                  <span className="text-[11px] text-ink">{e}</span>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
