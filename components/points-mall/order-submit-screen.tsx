"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, MapPin, Plus } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { getGoodsById, goods, addresses, freightFee } from "@/lib/points-mall-data"

export function OrderSubmitScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const id = Number(params.get("id") ?? 0)
  const qty = Math.max(1, Number(params.get("qty") ?? 1))
  const item = getGoodsById(id) ?? goods[0]

  const [addr, setAddr] = useState(() => addresses.find((a) => a.isDefault) ?? addresses[0])
  const [remark, setRemark] = useState("")
  const [toast, setToast] = useState("")
  const [paying, setPaying] = useState(false)

  const totalPoints = useMemo(() => item.points * qty, [item, qty])

  function pay() {
    if (paying) return
    setPaying(true)
    setToast("支付成功，正在生成订单")
    window.setTimeout(() => {
      router.push("/orders?tab=unshipped&paid=1")
    }, 1200)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="订单提交" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-28">
          {/* 收货地址 */}
          <button
            type="button"
            onClick={() => setAddr((a) => (a.id === addresses[0].id ? addresses[1] ?? a : addresses[0]))}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left card-soft active:bg-black/[0.02]"
          >
            {addr ? (
              <>
                <MapPin className="h-5 w-5 shrink-0 text-brand" />
                <div className="flex flex-1 flex-col">
                  <span className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                    {addr.name}
                    <span className="text-[13px] font-normal text-muted-foreground">{addr.phone}</span>
                  </span>
                  <span className="mt-1 text-[12px] text-muted-foreground">
                    {addr.region} {addr.detail}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-brand" />
                <span className="flex-1 text-[14px] text-ink">请添加收货地址</span>
              </>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* 商品信息 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <div className="flex items-start gap-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="line-clamp-2 text-[14px] text-ink">{item.name}</span>
                <span className="mt-1 text-lg font-black text-brand">
                  {item.points.toLocaleString()} <span className="text-xs font-semibold">积分</span>
                </span>
              </div>
              <span className="text-[13px] text-muted-foreground">x{qty}</span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-3 text-[14px]">
              <span className="text-ink">运费</span>
              <span className="font-semibold text-brand">{freightFee}</span>
            </div>
          </section>

          {/* 订单备注 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <span className="text-[14px] text-ink">订单备注</span>
            <input
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="选填，给商家留言"
              className="mt-2 w-full rounded-xl bg-muted px-3 py-2.5 text-[13px] text-ink outline-none placeholder:text-muted-foreground"
            />
          </section>
        </main>

        {/* 底部支付栏 */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t border-black/[0.06] bg-white px-4 py-3">
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] text-muted-foreground">
              共 {qty} 件，合计 <span className="font-black text-brand">{totalPoints.toLocaleString()}</span> 积分
            </span>
            <span className="text-[12px] text-muted-foreground">运费 {freightFee}</span>
          </div>
          <button
            type="button"
            onClick={pay}
            disabled={paying}
            className="brand-gradient glow-brand ml-auto rounded-full px-10 py-3 text-base font-bold text-white transition active:scale-95 disabled:opacity-70"
          >
            立即支付
          </button>
        </div>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
