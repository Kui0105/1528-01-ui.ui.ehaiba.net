"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Store, ShoppingCart, FileText, Boxes, Store as StoreIcon, Users, LineChart, Gift, Coins, ClipboardList, ChevronDown } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { dealerInfo } from "@/lib/points-mall-data"
import { TimeFilterSheet, type TimeOption } from "./time-filter-sheet"

const entryMeta: Record<string, { icon: typeof Store; color: string; href: string }> = {
  进货商城: { icon: ShoppingCart, color: "#c9302c", href: "/purchase-mall" },
  进货订单: { icon: FileText, color: "#e8833a", href: "/purchase-orders" },
  产品库存: { icon: Boxes, color: "#4f7fd6", href: "/product-stock" },
  门店管理: { icon: StoreIcon, color: "#2fa39a", href: "/store?role=dealer" },
  业务管理: { icon: Users, color: "#8a5cd6", href: "/business-manage" },
  销售明细: { icon: LineChart, color: "#3fae6f", href: "/sales-detail" },
  兑奖明细: { icon: Gift, color: "#d4a843", href: "/prize-detail" },
  物料商城: { icon: Gift, color: "#d1607a", href: "/material-mall" },
  积分明细: { icon: Coins, color: "#c9302c", href: "/dealer-points-detail" },
  物料订单: { icon: ClipboardList, color: "#4f7fd6", href: "/material-orders" },
}

export function DealerScreen() {
  const router = useRouter()
  const [toast, setToast] = useState("")
  const [time, setTime] = useState<TimeOption>("全部")
  const [timeOpen, setTimeOpen] = useState(false)

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="经销控制台" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-8">
          {/* 经销商信息 */}
          <section className="rounded-2xl bg-white p-4 card-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
                <Store className="h-7 w-7 text-brand" />
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold text-ink">{dealerInfo.name}</span>
                  <span className="rounded bg-[#3fae6f]/15 px-1.5 py-0.5 text-[11px] font-medium text-[#3fae6f]">
                    {dealerInfo.status}
                  </span>
                </div>
                <span className="mt-1 text-[12px] text-muted-foreground">{dealerInfo.region}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-brand/[0.06] px-4 py-3">
              <span className="text-[13px] text-ink">账户积分</span>
              <span className="text-lg font-black text-brand">{dealerInfo.points}</span>
            </div>
          </section>

          {/* 经营数据 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold text-ink">经营数据</span>
              <button
                type="button"
                onClick={() => setTimeOpen(true)}
                className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-[12px] text-ink active:scale-95"
              >
                {time}
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4">
              {dealerInfo.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center ${i > 0 ? "border-l border-black/[0.06]" : ""}`}
                >
                  <span className="text-lg font-black text-brand">{s.value}</span>
                  <span className="mt-1 text-[11px] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 功能入口 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <span className="text-[14px] font-bold text-ink">功能入口</span>
            <div className="mt-4 grid grid-cols-4 gap-y-5">
              {dealerInfo.entries.map((e) => {
                const meta = entryMeta[e]
                const Icon = meta?.icon ?? Store
                return (
                  <button
                    key={e}
                    type="button"
                    onClick={() => (meta ? router.push(meta.href) : showToast(`${e}敬请期待`))}
                    className="flex flex-col items-center gap-2 active:scale-95"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${meta?.color ?? "#c9302c"}14` }}
                    >
                      <Icon className="h-[22px] w-[22px]" style={{ color: meta?.color ?? "#c9302c" }} />
                    </span>
                    <span className="text-[11px] text-ink">{e}</span>
                  </button>
                )
              })}
            </div>
          </section>
        </main>

        <TimeFilterSheet open={timeOpen} value={time} onSelect={setTime} onClose={() => setTimeOpen(false)} />
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
