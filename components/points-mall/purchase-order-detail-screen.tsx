"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { MapPin } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { purchaseOrders, materialOrders } from "@/lib/dealer-data"

export function PurchaseOrderDetailScreen({ kind }: { kind: "purchase" | "material" }) {
  const params = useSearchParams()
  const id = params.get("id")

  const source = kind === "purchase" ? purchaseOrders : materialOrders
  const order = useMemo(() => source.find((o) => o.id === id) ?? source[0], [source, id])

  const isMaterial = kind === "material"
  const title = isMaterial ? "物料订单详情" : "进货订单详情"
  const unitLabel = isMaterial
    ? `${(order as (typeof materialOrders)[number]).points.toLocaleString()} 积分`
    : `¥${(order as (typeof purchaseOrders)[number]).price}`
  const totalLabel = isMaterial ? `${order.total.toLocaleString()} 积分` : `¥${order.total.toLocaleString()}`

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={title} />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-8">
          {/* 状态条 */}
          <section className="brand-gradient rounded-2xl px-4 py-4 text-white">
            <span className="text-[16px] font-bold">{order.status}</span>
            <p className="mt-1 text-[12px] text-white/85">
              {isMaterial ? "请留意物流信息，及时确认收货" : statusHint(order.status)}
            </p>
          </section>

          {/* 驳回原因（已驳回进货单） */}
          {!isMaterial && order.status === "已驳回" && (
            <section className="mt-3 rounded-2xl border border-[#e5484d]/25 bg-[#e5484d]/[0.06] p-4">
              <span className="text-[14px] font-bold text-[#e5484d]">驳回原因</span>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink/80">
                {(order as (typeof purchaseOrders)[number]).rejectReason ?? "未填写驳回原因"}
              </p>
            </section>
          )}

          {/* 收货信息（物料订单） */}
          {isMaterial && (
            <section className="mt-3 flex items-start gap-3 rounded-2xl bg-white p-4 card-soft">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-ink">经销商仓库 · 收货人</span>
                <span className="mt-0.5 text-[13px] text-muted-foreground">138****6688</span>
                <span className="mt-0.5 text-[13px] text-muted-foreground">广东省深圳市南山区科技园经销商仓库</span>
              </div>
            </section>
          )}

          {/* 商品信息 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <div className="flex items-center gap-3">
              <img
                src={order.image || "/placeholder.svg"}
                alt={order.name}
                className="h-14 w-14 shrink-0 rounded-xl bg-brand/5 object-contain"
              />
              <div className="flex flex-1 flex-col">
                <span className="text-[14px] font-semibold text-ink">{order.name}</span>
                <span className="mt-1 text-[12px] text-muted-foreground">
                  {unitLabel} × {order.qty}
                </span>
              </div>
            </div>
            <dl className="mt-3 flex flex-col gap-2 border-t border-black/[0.06] pt-3 text-[13px]">
              <Row label="数量小计" value={`${order.qty} 件`} />
              {!isMaterial && <Row label="单价" value={unitLabel} />}
              {isMaterial && <Row label="运费" value={`${(order as (typeof materialOrders)[number]).freight}`} />}
              <Row label="订单合计" value={totalLabel} highlight />
            </dl>
          </section>

          {/* 订单信息 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <dl className="flex flex-col gap-2.5 text-[13px]">
              <Row label="订单编号" value={order.no} />
              <Row label="下单时间" value="2026-09-03 10:25" />
              <Row label="订单状态" value={order.status} />
            </dl>
          </section>
        </main>
      </div>
    </PhoneFrame>
  )
}

function statusHint(status: string) {
  const map: Record<string, string> = {
    待入库: "进货单已提交，等待经销商处理",
    已入库: "进货产品已入库",
    已驳回: "进货单已被驳回，请查看驳回原因",
    已取消: "进货单已取消",
  }
  return map[status] ?? "进货单已提交，等待处理"
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={highlight ? "text-[15px] font-black text-brand" : "text-ink"}>{value}</dd>
    </div>
  )
}
