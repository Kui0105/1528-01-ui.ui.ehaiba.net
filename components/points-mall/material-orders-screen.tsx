"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { materialOrderTabs, materialOrders } from "@/lib/dealer-data"
import { cn } from "@/lib/utils"

const statusColor: Record<string, string> = {
  待付款: "bg-[#e8833a]/15 text-[#e8833a]",
  待发货: "bg-[#4f7fd6]/15 text-[#4f7fd6]",
  待收货: "bg-brand/10 text-brand",
  已完成: "bg-[#3fae6f]/15 text-[#3fae6f]",
  已关闭: "bg-black/10 text-muted-foreground",
}

type OrderAction = { label: string; kind: "detail" | "pay" | "cancel" | "receive"; primary?: boolean }

function orderActions(status: string): OrderAction[] {
  switch (status) {
    case "待付款":
      return [
        { label: "取消订单", kind: "cancel" },
        { label: "立即支付", kind: "pay", primary: true },
      ]
    case "待收货":
      return [
        { label: "查看详情", kind: "detail" },
        { label: "确认收货", kind: "receive", primary: true },
      ]
    default:
      // 待发货 / 已完成 / 已关闭
      return [{ label: "查看详情", kind: "detail" }]
  }
}

export function MaterialOrdersScreen() {
  const router = useRouter()
  const [tab, setTab] = useState<string>(materialOrderTabs[0])
  const [keyword, setKeyword] = useState("")
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  const list = useMemo(() => {
    let arr = materialOrders
    if (tab !== "全部") arr = arr.filter((o) => o.status === tab)
    if (keyword) arr = arr.filter((o) => o.no.includes(keyword) || o.name.includes(keyword))
    return arr
  }, [tab, keyword])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="物料订单" />

        <div className="shrink-0 bg-white px-3 pt-2.5">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="物料单号 / 物料名称"
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
          <div className="no-scrollbar mt-1 flex items-center gap-1 overflow-x-auto text-[13px]">
            {materialOrderTabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "relative shrink-0 px-3 py-2.5 font-medium transition-colors",
                  tab === t ? "text-brand" : "text-muted-foreground",
                )}
              >
                {t}
                {tab === t && <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-brand" />}
              </button>
            ))}
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-3">
            {list.map((o) => (
              <div key={o.id} className="rounded-2xl bg-white p-4 card-soft">
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
                  <span className="text-[13px] text-muted-foreground tabular-nums">{o.no}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${statusColor[o.status]}`}>{o.status}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={o.image || "/placeholder.svg"}
                    alt={o.name}
                    className="h-12 w-12 shrink-0 rounded-xl bg-brand/5 object-contain"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="text-[14px] text-ink">{o.name}</span>
                    <span className="mt-0.5 text-[12px] text-muted-foreground">
                      {o.points.toLocaleString()} 积分 ×{o.qty}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-3">
                  <span className="text-[15px] font-black text-brand">{o.total.toLocaleString()} 积分</span>
                  <span className="text-[12px] text-muted-foreground">共 {o.qty} 件</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[12px] text-muted-foreground">
                    下单时间 {o.orderTime} · 运费 {o.freight}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-end gap-2.5">
                  {orderActions(o.status).map((a) => (
                    <button
                      key={a.label}
                      type="button"
                      onClick={() => {
                        if (a.kind === "detail") {
                          router.push(`/material-order-detail?id=${o.id}`)
                        } else if (a.kind === "pay") {
                          showToast("支付成功")
                        } else if (a.kind === "cancel") {
                          showToast("订单已取消")
                        } else if (a.kind === "receive") {
                          showToast("已确认收货")
                        }
                      }}
                      className={
                        a.primary
                          ? "brand-gradient rounded-full px-5 py-1.5 text-[13px] font-semibold text-white active:scale-95"
                          : "rounded-full border border-black/10 px-5 py-1.5 text-[13px] text-ink active:scale-95"
                      }
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
