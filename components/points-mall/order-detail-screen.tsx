"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { MapPin } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { getOrderById, orders, orderStatusText, addresses, freightFee } from "@/lib/points-mall-data"

export function OrderDetailScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const order = getOrderById(params.get("id") ?? "") ?? orders[0]
  const addr = addresses.find((a) => a.isDefault) ?? addresses[0]
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="订单详情" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          {/* 状态条 */}
          <div className="brand-gradient flex flex-col items-center gap-1 rounded-2xl px-4 py-6 text-white">
            <span className="text-lg font-bold">{orderStatusText[order.status]}</span>
            <span className="text-[12px] text-white/80">感谢您的兑换，请留意物流信息</span>
          </div>

          {/* 收货地址 */}
          <section className="mt-3 flex items-start gap-3 rounded-2xl bg-white p-4 card-soft">
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
          </section>

          {/* 商品信息 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <div className="flex items-start gap-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={goodsImage(order.goodsId)}
                  alt={order.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="line-clamp-2 text-[14px] text-ink">{order.name}</span>
                <span className="mt-1 text-[13px] text-brand">{order.points.toLocaleString()} 积分</span>
              </div>
              <span className="text-[13px] text-muted-foreground">x{order.qty}</span>
            </div>

            <div className="mt-4 space-y-2 border-t border-black/[0.06] pt-3 text-[13px]">
              <Row label="积分小计" value={`${(order.points * order.qty).toLocaleString()} 积分`} />
              <Row label="运费" value={freightFee} />
              <Row label="实付运费" value={freightFee} highlight />
            </div>
          </section>

          {/* 订单信息 */}
          <section className="mt-3 space-y-2 rounded-2xl bg-white p-4 card-soft text-[13px]">
            <Row label="订单编号" value={order.id} />
            <Row label="下单时间" value={order.time} />
          </section>
        </main>

        {/* 底部操作 */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-end gap-3 border-t border-black/[0.06] bg-white px-4 py-3">
          <button
            type="button"
            onClick={() => showToast("已复制订单编号")}
            className="rounded-full border border-black/10 px-5 py-2 text-[13px] text-ink active:scale-95"
          >
            复制单号
          </button>
          <button
            type="button"
            onClick={() => router.push("/message")}
            className="brand-gradient rounded-full px-6 py-2 text-[13px] font-semibold text-white active:scale-95"
          >
            查看物流
          </button>
        </div>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "font-semibold text-brand" : "text-ink"}>{value}</span>
    </div>
  )
}

function goodsImage(id: number): string {
  const map: Record<number, string> = {
    0: "/products/lighter.png",
    1: "/products/storage-box.png",
    2: "/products/towel-set.png",
    3: "/products/canvas-bag.png",
    4: "/products/speaker.png",
    5: "/products/keychain.png",
  }
  return map[id] ?? "/placeholder.svg"
}
