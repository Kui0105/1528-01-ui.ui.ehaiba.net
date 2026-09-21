"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Package, CheckCircle2 } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { purchaseProducts } from "@/lib/dealer-data"

type CartItem = { id: string; qty: number }

const regions = ["长沙市天心区", "长沙市芙蓉区", "长沙市岳麓区", "长沙市开福区", "长沙市雨花区"]

export function PurchaseOrderCreateScreen() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [region, setRegion] = useState("")
  const [regionPicker, setRegionPicker] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [toast, setToast] = useState("")

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("purchaseCart")
      if (raw) setCart(JSON.parse(raw))
    } catch {
      // ignore
    }
  }, [])

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  const lines = useMemo(
    () =>
      cart
        .map((c) => {
          const product = purchaseProducts.find((p) => p.id === c.id)
          return product ? { product, qty: c.qty } : null
        })
        .filter((x): x is { product: (typeof purchaseProducts)[number]; qty: number } => x !== null),
    [cart],
  )

  const totalCount = lines.reduce((sum, l) => sum + l.qty, 0)
  const totalPrice = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)
  const hasItems = lines.length > 0

  function handleSubmit() {
    if (!region) {
      showToast("请选择进货地区")
      return
    }
    setConfirmOpen(true)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="新增进货订单" />

        {hasItems ? (
          <>
            <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-28">
              {/* 进货商品 */}
              <div className="rounded-2xl bg-white p-4 card-soft">
                <p className="mb-3 text-[14px] font-bold text-ink">进货商品</p>
                <div className="flex flex-col gap-3">
                  {lines.map((l) => (
                    <div key={l.product.id} className="flex items-center gap-3 border-b border-black/[0.05] pb-3 last:border-0 last:pb-0">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                        <Package className="h-7 w-7 text-brand" strokeWidth={1.6} />
                      </span>
                      <div className="flex flex-1 flex-col">
                        <span className="text-[14px] font-semibold text-ink">{l.product.name}</span>
                        <span className="mt-0.5 text-[12px] text-muted-foreground">{l.product.spec}</span>
                        <span className="mt-1 text-[13px]">
                          <span className="font-bold text-brand">¥{l.product.price}</span>
                          <span className="text-muted-foreground"> × {l.qty}</span>
                        </span>
                      </div>
                      <span className="shrink-0 text-[14px] font-black text-brand">
                        ¥{(l.product.price * l.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 进货地区 */}
              <div className="mt-3 rounded-2xl bg-white p-4 card-soft">
                <p className="mb-3 text-[14px] font-bold text-ink">进货地区</p>
                <button
                  type="button"
                  onClick={() => setRegionPicker(true)}
                  className="flex w-full items-center justify-between rounded-xl bg-muted px-3.5 py-3 text-[13px]"
                >
                  <span className={region ? "text-ink" : "text-muted-foreground"}>{region || "请选择进货地区"}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* 金额汇总 */}
              <div className="mt-3 rounded-2xl bg-white p-4 card-soft">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground">商品件数</span>
                  <span className="text-ink tabular-nums">{totalCount} 件</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground">进货金额</span>
                  <span className="font-black text-brand">¥{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </main>

            {/* 底部提交栏 */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-black/[0.06] bg-white px-4 py-3">
              <div className="flex flex-col">
                <span className="text-[12px] text-muted-foreground">
                  共 <span className="font-semibold text-ink">{totalCount}</span> 件
                </span>
                <span className="text-[15px] font-black text-brand">合计 ¥{totalPrice.toLocaleString()}</span>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="brand-gradient glow-brand rounded-full px-8 py-2.5 text-[15px] font-bold text-white active:scale-95"
              >
                确认提交
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <Package className="h-14 w-14 text-muted-foreground/40" strokeWidth={1.4} />
            <p className="mt-4 text-[15px] font-semibold text-ink">未获取到进货商品</p>
            <p className="mt-1.5 text-[13px] text-muted-foreground">请返回进货商城重新选择</p>
            <button
              type="button"
              onClick={() => router.push("/purchase-mall")}
              className="brand-gradient mt-5 rounded-full px-8 py-2.5 text-[14px] font-semibold text-white active:scale-95"
            >
              返回进货商城
            </button>
          </div>
        )}

        {/* 地区选择弹层 */}
        {regionPicker && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setRegionPicker(false)}>
            <div className="rounded-t-2xl bg-white pb-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">选择地区</span>
                <button type="button" onClick={() => setRegionPicker(false)} className="text-[13px] text-muted-foreground">
                  取消
                </button>
              </div>
              {regions.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRegion(r)
                    setRegionPicker(false)
                  }}
                  className={`flex w-full items-center px-4 py-3 text-left text-[14px] active:bg-black/[0.03] ${
                    region === r ? "font-semibold text-brand" : "text-ink"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 确认提交弹层 */}
        {confirmOpen && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setConfirmOpen(false)}>
            <div className="rounded-t-2xl bg-white px-5 pb-5 pt-4" onClick={(e) => e.stopPropagation()}>
              <p className="text-center text-[16px] font-bold text-ink">确认提交该进货订单？</p>
              <p className="mt-2 text-center text-[13px] text-muted-foreground">提交后将进入待入库状态</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 rounded-full border border-black/10 py-2.5 text-[14px] text-ink active:scale-95"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmOpen(false)
                    setSuccess(true)
                    try {
                      window.sessionStorage.removeItem("purchaseCart")
                    } catch {
                      // ignore
                    }
                  }}
                  className="brand-gradient flex-1 rounded-full py-2.5 text-[14px] font-semibold text-white active:scale-95"
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
              <CheckCircle2 className="mx-auto h-14 w-14 text-[#3fae6f]" strokeWidth={1.6} />
              <p className="mt-3 text-[16px] font-bold text-ink">进货订单已提交</p>
              <p className="mt-1.5 text-[13px] text-muted-foreground">可在进货订单中查看订单状态</p>
              <button
                type="button"
                onClick={() => router.push("/purchase-orders")}
                className="brand-gradient mt-5 w-full rounded-full py-2.5 text-[15px] font-semibold text-white active:scale-95"
              >
                查看订单
              </button>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
