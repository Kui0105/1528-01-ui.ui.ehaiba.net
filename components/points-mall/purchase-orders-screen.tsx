"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronRight } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { purchaseOrderTabs, purchaseOrders } from "@/lib/dealer-data"
import { cn } from "@/lib/utils"

const statusColor: Record<string, string> = {
  待入库: "bg-[#e8833a]/15 text-[#e8833a]",
  已入库: "bg-[#3fae6f]/15 text-[#3fae6f]",
  已驳回: "bg-brand/10 text-brand",
  已取消: "bg-black/10 text-muted-foreground",
}

export function PurchaseOrdersScreen() {
  const router = useRouter()
  const [tab, setTab] = useState<string>(purchaseOrderTabs[0])
  const [keyword, setKeyword] = useState("")
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  const list = useMemo(() => {
    let arr = purchaseOrders
    if (tab !== "全部") arr = arr.filter((o) => o.status === tab)
    if (keyword) arr = arr.filter((o) => o.no.includes(keyword) || o.name.includes(keyword))
    return arr
  }, [tab, keyword])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="进货订单" />

        <div className="shrink-0 bg-white px-3 pt-2.5">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="进货单号 / 产品"
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
          <div className="mt-1 flex items-center text-[13px]">
            {purchaseOrderTabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "relative flex-1 px-1 py-2.5 text-center font-medium transition-colors",
                  tab === t ? "text-brand" : "text-muted-foreground",
                )}
              >
                {t}
                {tab === t && <span className="absolute inset-x-1/4 bottom-1 h-0.5 rounded-full bg-brand" />}
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
                      {o.spec} · ¥{o.price} ×{o.qty}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-3">
                  <span className="text-[13px] text-muted-foreground">
                    共 {o.qty} 件
                  </span>
                  <span className="text-[15px] font-black text-brand">¥{o.total.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/purchase-order-detail?id=${o.id}`)}
                  className="mt-2 flex w-full items-center justify-end text-[13px] text-muted-foreground active:opacity-70"
                >
                  查看详情
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
