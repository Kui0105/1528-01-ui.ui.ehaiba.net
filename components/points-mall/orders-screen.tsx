"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { orders, orderTabs, orderStatusText, getGoodsById, freightFee, type OrderStatus } from "@/lib/points-mall-data"
import { cn } from "@/lib/utils"

const statusColor: Record<OrderStatus, string> = {
  unpaid: "#c9302c",
  unshipped: "#e0a13a",
  shipping: "#4f7fd6",
  done: "#3fae6f",
}

export function OrdersScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const initial = params.get("tab") ?? "all"
  const [tab, setTab] = useState(initial)
  const [toast, setToast] = useState(params.get("paid") === "1" ? "兑换成功，等待发货" : "")

  const list = useMemo(() => (tab === "all" ? orders : orders.filter((o) => o.status === tab)), [tab])

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="我的订单" />

        {/* 状态 Tab */}
        <div className="flex shrink-0 items-center border-b border-black/[0.06] bg-white text-[13px]">
          {orderTabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "relative flex-1 py-3 text-center font-medium transition-colors",
                tab === t.key ? "text-brand" : "text-muted-foreground",
              )}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute inset-x-0 bottom-1 mx-auto h-0.5 w-6 rounded-full bg-brand" />
              )}
            </button>
          ))}
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          {list.length === 0 ? (
            <p className="mt-20 text-center text-[13px] text-muted-foreground">暂无相关订单</p>
          ) : (
            <div className="flex flex-col gap-3">
              {list.map((o) => {
                const g = getGoodsById(o.goodsId)
                return (
                  <div key={o.id} className="rounded-2xl bg-white p-4 card-soft">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-muted-foreground">订单号 {o.id}</span>
                      <span className="font-medium" style={{ color: statusColor[o.status] }}>
                        {orderStatusText[o.status]}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push(`/order-detail?id=${o.id}`)}
                      className="mt-3 flex w-full items-start gap-3 text-left"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={g?.image || "/placeholder.svg"}
                          alt={o.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <span className="line-clamp-2 text-[14px] text-ink">{o.name}</span>
                        <span className="mt-1 text-[13px] text-brand">
                          {o.points.toLocaleString()} 积分 <span className="text-muted-foreground">x{o.qty}</span>
                        </span>
                      </div>
                    </button>

                    <div className="mt-3 flex items-center justify-end gap-2 border-t border-black/[0.06] pt-3 text-[12px]">
                      <span className="mr-auto text-muted-foreground">运费 {freightFee}</span>
                      {o.status === "unpaid" && (
                        <button
                          type="button"
                          onClick={() => router.push(`/order-submit?id=${o.goodsId}&qty=${o.qty}`)}
                          className="brand-gradient rounded-full px-4 py-1.5 font-semibold text-white active:scale-95"
                        >
                          去付款
                        </button>
                      )}
                      {o.status === "shipping" && (
                        <button
                          type="button"
                          onClick={() => showToast("已确认收货")}
                          className="brand-gradient rounded-full px-4 py-1.5 font-semibold text-white active:scale-95"
                        >
                          确认收货
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => router.push(`/order-detail?id=${o.id}`)}
                        className="rounded-full border border-black/10 px-4 py-1.5 text-ink active:scale-95"
                      >
                        查看详情
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
