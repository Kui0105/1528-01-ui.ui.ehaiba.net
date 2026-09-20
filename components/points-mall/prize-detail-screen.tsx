"use client"

import { useMemo, useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { prizeStatusTabs, prizeRecords } from "@/lib/dealer-data"

export function PrizeDetailScreen() {
  const [keyword, setKeyword] = useState("")
  const [status, setStatus] = useState<string>(prizeStatusTabs[0])
  const [picker, setPicker] = useState(false)
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  const list = useMemo(() => {
    let arr = prizeRecords
    if (status !== "全部状态") arr = arr.filter((r) => r.status === status)
    if (keyword) arr = arr.filter((r) => r.no.includes(keyword) || r.store.includes(keyword) || r.codeId.includes(keyword))
    return arr
  }, [keyword, status])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="兑奖明细" />

        {/* 搜索 + 状态 */}
        <div className="shrink-0 bg-white px-3 pb-2.5 pt-2.5">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="兑奖单号 / 门店 / 码ID"
                className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-foreground/60"
              />
            </div>
            <button
              type="button"
              onClick={() => showToast("搜索完成")}
              className="brand-gradient rounded-full px-4 py-2 text-[13px] font-semibold text-white active:scale-95"
            >
              搜索
            </button>
          </div>
          <button
            type="button"
            onClick={() => setPicker(true)}
            className="mt-2.5 flex w-full items-center justify-between rounded-xl bg-muted px-3.5 py-2 text-[13px] text-ink"
          >
            {status}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-3">
            {list.map((r) => (
              <div key={r.id} className="rounded-2xl bg-white p-4 card-soft">
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
                  <span className="text-[14px] font-bold text-ink">兑奖单 {r.no}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                      r.status === "已核销" ? "bg-[#3fae6f]/15 text-[#3fae6f]" : "bg-brand/10 text-brand"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="mt-2.5 flex flex-col gap-1.5 text-[13px]">
                  <Row label="门店" value={r.store} />
                  <Row label="码ID" value={r.codeId} mono />
                  <Row label="奖项内容" value={r.prize} />
                  <Row label="核销门店" value={r.checker} />
                  <Row label="兑奖时间" value={r.time} mono />
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 状态选择器 */}
        {picker && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setPicker(false)}>
            <div className="rounded-t-2xl bg-white pb-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">选择状态</span>
                <button type="button" onClick={() => setPicker(false)} className="text-[13px] text-muted-foreground">
                  取消
                </button>
              </div>
              {prizeStatusTabs.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setStatus(s)
                    setPicker(false)
                  }}
                  className={`flex w-full items-center px-4 py-3 text-left text-[14px] active:bg-black/[0.03] ${
                    status === s ? "font-semibold text-brand" : "text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className={`text-right text-ink ${mono ? "tabular-nums" : ""}`}>{value}</span>
    </div>
  )
}
