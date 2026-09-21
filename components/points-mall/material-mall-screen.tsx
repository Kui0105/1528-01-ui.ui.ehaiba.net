"use client"

import { useMemo, useState } from "react"
import { Search, Minus, Plus, Gift, X, CheckCircle2 } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { materialTabs, materialProducts } from "@/lib/dealer-data"

export function MaterialMallScreen() {
  const [tab, setTab] = useState<string>(materialTabs[0])
  const [keyword, setKeyword] = useState("")
  const [qty, setQty] = useState<Record<string, number>>({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  const list = useMemo(() => {
    let arr = materialProducts
    if (tab !== "全部") arr = arr.filter((p) => p.category === tab)
    if (keyword) arr = arr.filter((p) => p.name.includes(keyword))
    return arr
  }, [tab, keyword])

  const totalCount = Object.values(qty).reduce((a, b) => a + b, 0)
  const totalPoints = materialProducts.reduce((sum, p) => sum + (qty[p.id] ?? 0) * p.points, 0)

  function step(id: string, delta: number) {
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }))
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="物料商城" />

        <div className="shrink-0 bg-white px-3 pb-2 pt-2.5">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索物料"
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
          <div className="no-scrollbar mt-2.5 flex items-center gap-2 overflow-x-auto">
            {materialTabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                  tab === t ? "brand-gradient font-semibold text-white" : "bg-muted text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          <div className="flex flex-col gap-2.5">
            {list.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 card-soft">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                  <Gift className="h-7 w-7 text-brand" strokeWidth={1.6} />
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-[14px] font-semibold text-ink">{p.name}</span>
                  <span className="mt-1 flex items-baseline gap-2">
                    <span className="text-[15px] font-black text-brand">{p.points.toLocaleString()} 积分</span>
                  </span>
                  <span className="mt-0.5 text-[12px] text-muted-foreground">库存 {p.stock} 件</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(p.id, -1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-ink active:scale-90 disabled:opacity-30"
                    disabled={!qty[p.id]}
                    aria-label="减少"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-[14px] tabular-nums text-ink">{qty[p.id] ?? 0}</span>
                  <button
                    type="button"
                    onClick={() => step(p.id, 1)}
                    className="brand-gradient flex h-7 w-7 items-center justify-center rounded-full text-white active:scale-90"
                    aria-label="增加"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-black/[0.06] bg-white px-4 py-3">
          <div className="flex flex-col">
            <span className="text-[12px] text-muted-foreground">
              已选 <span className="font-semibold text-ink">{totalCount}</span> 件
            </span>
            <span className="text-[15px] font-black text-brand">合计 {totalPoints.toLocaleString()} 积分</span>
          </div>
          <button
            type="button"
            onClick={() => (totalCount ? setConfirmOpen(true) : showToast("请选择物料"))}
            className="brand-gradient glow-brand rounded-full px-8 py-2.5 text-[15px] font-bold text-white active:scale-95"
          >
            兑换物料
          </button>
        </div>

        {/* 兑换确认弹层 */}
        {confirmOpen && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setConfirmOpen(false)}>
            <div className="rounded-t-2xl bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">确认兑换</span>
                <button type="button" onClick={() => setConfirmOpen(false)} aria-label="关闭">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="no-scrollbar max-h-[40vh] overflow-y-auto p-4">
                <div className="flex flex-col gap-2.5">
                  {materialProducts
                    .filter((p) => (qty[p.id] ?? 0) > 0)
                    .map((p) => (
                      <div key={p.id} className="flex items-center justify-between rounded-xl bg-muted px-3.5 py-2.5">
                        <span className="text-[13px] text-ink">
                          {p.name} <span className="text-muted-foreground">×{qty[p.id]}</span>
                        </span>
                        <span className="text-[13px] font-semibold text-brand">
                          {((qty[p.id] ?? 0) * p.points).toLocaleString()} 积分
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="border-t border-black/[0.06] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[13px] text-muted-foreground">合计消耗</span>
                  <span className="text-[17px] font-black text-brand">{totalPoints.toLocaleString()} 积分</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmOpen(false)
                    setSuccessOpen(true)
                    setQty({})
                  }}
                  className="brand-gradient glow-brand w-full rounded-full py-3 text-[15px] font-bold text-white active:scale-[0.98]"
                >
                  确认兑换
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 兑换成功 */}
        {successOpen && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 px-8">
            <div className="w-full rounded-2xl bg-white px-6 py-7 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-[#3fae6f]" strokeWidth={1.6} />
              <p className="mt-3 text-[17px] font-bold text-ink">兑换成功</p>
              <p className="mt-1.5 text-[13px] text-muted-foreground">物料订单已提交，可在「物料订单」查看进度</p>
              <button
                type="button"
                onClick={() => setSuccessOpen(false)}
                className="brand-gradient mt-5 w-full rounded-full py-2.5 text-[15px] font-semibold text-white active:scale-95"
              >
                我知道了
              </button>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
