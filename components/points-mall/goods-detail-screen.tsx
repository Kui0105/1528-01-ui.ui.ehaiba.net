"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { getGoodsById, goodsDetailInfo, goods } from "@/lib/points-mall-data"
import { Minus, Plus, X } from "lucide-react"

export function GoodsDetailScreen({ id }: { id: number }) {
  const router = useRouter()
  const item = getGoodsById(id) ?? goods[0]
  const [sheet, setSheet] = useState(false)
  const [qty, setQty] = useState(1)
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  function exchange() {
    setSheet(false)
    showToast(`已兑换 ${item.name} ×${qty}`)
  }

  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col bg-muted">
        <MobileNavBar title="商品详情" />

        <main className="no-scrollbar flex-1 overflow-y-auto pb-24">
          {/* 主图 */}
          <div className="relative aspect-square w-full bg-white">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              sizes="420px"
              priority
              className="object-cover"
            />
          </div>

          {/* 价格信息卡 */}
          <section className="bg-white px-4 pb-4 pt-3">
            <h1 className="text-lg font-bold leading-snug text-ink">{item.name}</h1>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-2xl font-black text-brand">
                {item.points.toLocaleString()} <span className="text-sm font-semibold">积分</span>
              </span>
              <span className="pb-1 text-sm text-muted-foreground line-through">{item.orig}</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              已兑换 {item.ex} 件 · {goodsDetailInfo.stock}
            </p>
          </section>

          {/* 图文详情 */}
          <section className="mt-3 bg-white px-4 py-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
              <span className="h-4 w-1 rounded-full bg-brand" />
              {goodsDetailInfo.detailTitle}
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {goodsDetailInfo.detailParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </main>

        {/* 底部兑换栏 */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t border-black/[0.06] bg-white px-4 py-3">
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] text-muted-foreground">所需积分</span>
            <span className="text-lg font-black text-brand">{item.points.toLocaleString()}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setQty(1)
              setSheet(true)
            }}
            className="brand-gradient glow-brand ml-auto rounded-full px-12 py-3 text-base font-bold text-white transition active:scale-95"
          >
            立即兑换
          </button>
        </div>

        {/* 兑换弹层 */}
        {sheet && (
          <div className="absolute inset-0 z-30 flex items-end bg-black/50 backdrop-blur-sm">
            <div className="w-full rounded-t-3xl bg-white p-4 pb-6">
              <div className="flex items-start gap-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="line-clamp-2 text-sm font-medium text-ink">{item.name}</span>
                  <span className="mt-1 text-lg font-black text-brand">
                    {item.points.toLocaleString()} <span className="text-xs font-semibold">积分</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground line-through">{item.orig}</span>
                </div>
                <button
                  type="button"
                  aria-label="关闭"
                  onClick={() => setSheet(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">兑换数量</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="减少"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-ink transition active:scale-90 disabled:opacity-40"
                    disabled={qty <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-base font-bold tabular-nums text-ink">{qty}</span>
                  <button
                    type="button"
                    aria-label="增加"
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-ink transition active:scale-90"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={exchange}
                className="brand-gradient glow-brand mt-6 w-full rounded-full py-3.5 text-base font-bold text-white transition active:scale-[0.98]"
              >
                立即兑换（{(item.points * qty).toLocaleString()} 积分）
              </button>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
