"use client"

import { useState } from "react"
import { Copy, Truck } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { logisticsInfo } from "@/lib/dealer-data"

export function LogisticsScreen() {
  const [toast, setToast] = useState("")

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="物流信息" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-8">
          {/* 快递信息 */}
          <section className="flex items-center gap-3 rounded-2xl bg-white p-4 card-soft">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10">
              <Truck className="h-6 w-6 text-brand" strokeWidth={1.9} />
            </span>
            <div className="flex flex-1 flex-col">
              <span className="text-[15px] font-bold text-ink">{logisticsInfo.company}</span>
              <span className="mt-0.5 text-[12px] text-muted-foreground">运单号：{logisticsInfo.trackingNo}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setToast("已复制运单号")
                window.setTimeout(() => setToast(""), 1400)
              }}
              className="flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-[12px] text-ink active:scale-95"
            >
              <Copy className="h-3.5 w-3.5" />
              复制
            </button>
          </section>

          {/* 物流轨迹 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <ol className="flex flex-col">
              {logisticsInfo.nodes.map((n, i) => {
                const first = i === 0
                const last = i === logisticsInfo.nodes.length - 1
                return (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${first ? "bg-brand ring-4 ring-brand/15" : "bg-black/20"}`}
                      />
                      {!last && <span className="w-px flex-1 bg-black/10" />}
                    </div>
                    <div className={`flex-1 ${last ? "pb-0" : "pb-5"}`}>
                      <p className={`text-[13px] leading-relaxed ${first ? "font-medium text-ink" : "text-muted-foreground"}`}>
                        {n.desc}
                      </p>
                      <span className="mt-1 block text-[12px] text-muted-foreground/70 tabular-nums">{n.time}</span>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        </main>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
