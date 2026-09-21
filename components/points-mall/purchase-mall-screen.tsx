"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Minus, Plus, Package, X, CheckCircle2 } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { purchaseTabs, purchaseProducts } from "@/lib/dealer-data"

export function PurchaseMallScreen() {
  const router = useRouter()
  const [tab, setTab] = useState<string>(purchaseTabs[0])
  const [keyword, setKeyword] = useState("")
  const [qty, setQty] = useState<Record<string, number>>({})
  const [toast, setToast] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  const list = useMemo(() => {
    let arr = purchaseProducts
    if (tab !== "全部") arr = arr.filter((p) => p.series === tab)
    if (keyword) arr = arr.filter((p) => p.name.includes(keyword))
    return arr
  }, [tab, keyword])

  const totalCount = Object.values(qty).reduce((a, b) => a + b, 0)
  const totalPrice = purchaseProducts.reduce((sum, p) => sum + (qty[p.id] ?? 0) * p.price, 0)

  function step(id: string, delta: number) {
    setQty((q) => {
      const next = Math.max(0, (q[id] ?? 0) + delta)
      return { ...q, [id]: next }
    })
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="进货商城" />

        {/* 搜索 + Tab */}
        <div className="shrink-0 bg-white px-3 pb-2 pt-2.5">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索进货产品"
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
            {purchaseTabs.map((t) => (
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
                  <Package className="h-7 w-7 text-brand" strokeWidth={1.6} />
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-[14px] font-semibold text-ink">{p.name}</span>
                  <span className="mt-1 flex items-baseline gap-2">
                    <span className="text-[16px] font-black text-brand">¥{p.price}</span>
                    <span className="text-[12px] text-muted-foreground">{p.spec}</span>
                  </span>
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

        {/* 结算栏 */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-black/[0.06] bg-white px-4 py-3">
          <div className="flex flex-col">
            <span className="text-[12px] text-muted-foreground">
              已选 <span className="font-semibold text-ink">{totalCount}</span> 件
            </span>
            <span className="text-[15px] font-black text-brand">合计 ¥{totalPrice.toLocaleString()}</span>
          </div>
          <button
            type="button"
            onClick={() => (totalCount ? setConfirmOpen(true) : showToast("请选择进货产品"))}
            className="brand-gradient glow-brand rounded-full px-8 py-2.5 text-[15px] font-bold text-white active:scale-95"
          >
            提交进货订单
          </button>
        </div>

        {/* 进货确认弹层 */}
        {confirmOpen && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setConfirmOpen(false)}>
            <div className="rounded-t-2xl bg-white pb-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">确认进货清单</span>
                <button type="button" onClick={() => setConfirmOpen(false)} aria-label="关闭">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto px-4">
                {purchaseProducts
                  .filter((p) => qty[p.id])
                  .map((p) => (
                    <div key={p.id} className="flex items-center justify-between border-b border-black/[0.04] py-2.5">
                      <span className="text-[14px] text-ink">{p.name}</span>
                      <span className="text-[13px] text-muted-foreground">
                        ¥{p.price} × {qty[p.id]}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="flex items-center justify-between px-4 pt-3">
                <span className="text-[13px] text-muted-foreground">
                  共 {totalCount} 件
                </span>
                <span className="text-[16px] font-black text-brand">合计 ¥{totalPrice.toLocaleString()}</span>
              </div>
              <div className="px-4 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setConfirmOpen(false)
                    setSuccess(true)
                  }}
                  className="brand-gradient glow-brand w-full rounded-full py-3 text-[15px] font-bold text-white active:scale-[0.98]"
                >
                  确认提交
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 提交成功 */}
        {success && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 px-8">
            <div className="w-full rounded-2xl bg-white px-6 py-7 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-[#3fae6f]" />
              <p className="mt-3 text-[16px] font-bold text-ink">进货订单已提交</p>
              <p className="mt-1 text-[13px] text-muted-foreground">可在进货订单中查看订单状态</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false)
                    setQty({})
                  }}
                  className="flex-1 rounded-full border border-black/10 py-2.5 text-[14px] text-ink active:scale-95"
                >
                  继续进货
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/purchase-orders")}
                  className="brand-gradient flex-1 rounded-full py-2.5 text-[14px] font-semibold text-white active:scale-95"
                >
                  查看订单
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
