"use client"

import { useMemo, useState } from "react"
import { Search, MapPin } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { salesData } from "@/lib/points-mall-data"

export function SalesRegionScreen() {
  const [keyword, setKeyword] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const list = useMemo(() => {
    if (!submitted || !keyword) return []
    return salesData.filter((s) => s.store.includes(keyword))
  }, [submitted, keyword])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="区域详情" />

        {/* 搜索 */}
        <div className="flex shrink-0 items-center gap-2 bg-white px-3 py-2.5">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
                setSubmitted(false)
              }}
              placeholder="搜索区域名称 / 门店 / 业务员"
              className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-foreground/60"
            />
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="brand-gradient rounded-full px-4 py-2 text-[13px] font-semibold text-white active:scale-95"
          >
            查询
          </button>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 pt-24 text-center">
              <MapPin className="h-12 w-12 text-black/15" />
              <p className="text-[13px] text-muted-foreground">请输入区域名称进行查询</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {list.map((s) => (
                <div key={s.store} className="rounded-2xl bg-white p-4 card-soft">
                  <span className="text-[15px] font-bold text-ink">{s.store}</span>
                  <div className="mt-3 flex items-center border-t border-black/[0.06] pt-3">
                    <Metric label="订单数" value={s.order} />
                    <Metric label="激活数" value={s.active} border />
                    <Metric label="兑奖数" value={s.amount} border />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </PhoneFrame>
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
