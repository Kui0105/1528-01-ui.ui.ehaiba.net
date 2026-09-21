"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronDown, User, PackageCheck, PackageX, BadgeCheck, FileText, Store } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { promoteInfo } from "@/lib/points-mall-data"
import { stores } from "@/lib/dealer-data"
import { TimeFilterSheet, type TimeOption } from "./time-filter-sheet"

const entryMeta: Record<string, { icon: typeof User; color: string; href: string }> = {
  产品激活: { icon: PackageCheck, color: "#c9302c", href: "/activate" },
  产品回收: { icon: PackageX, color: "#e8833a", href: "/recycle" },
  兑奖核销: { icon: BadgeCheck, color: "#3fae6f", href: "/verify-prize" },
  门店管理: { icon: Store, color: "#4f7fd6", href: "/store" },
  产品明细: { icon: FileText, color: "#8a5cd6", href: "/product-detail" },
}

const storeOptions = ["全部门店", ...stores.map((s) => s.name)]

export function PromoteScreen() {
  const router = useRouter()
  const [toast, setToast] = useState("")
  const [time, setTime] = useState<TimeOption>("全部")
  const [timeOpen, setTimeOpen] = useState(false)
  const [store, setStore] = useState("全部门店")
  const [storeOpen, setStoreOpen] = useState(false)

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="业务推广" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-8">
          {/* 业务员信息 */}
          <section className="flex items-center gap-3 rounded-2xl bg-white p-4 card-soft">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
              <User className="h-7 w-7 text-brand" />
            </span>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-ink">{promoteInfo.name}</span>
              <span className="mt-0.5 text-[12px] text-muted-foreground">{promoteInfo.phone}</span>
              <span className="mt-0.5 text-[12px] text-muted-foreground">{promoteInfo.dealer}</span>
            </div>
          </section>

          {/* 我的积分 */}
          <button
            type="button"
            onClick={() => router.push("/salesman-points-detail")}
            className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left card-soft active:bg-black/[0.02]"
          >
            <div className="flex flex-col">
              <span className="text-[12px] text-muted-foreground">我的积分</span>
              <span className="mt-1 text-xl font-black text-brand">{promoteInfo.points}</span>
            </div>
            <span className="flex items-center text-[12px] text-muted-foreground">
              积分明细
              <ChevronRight className="h-4 w-4" />
            </span>
          </button>

          {/* 推广数据 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold text-ink">推广数据</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStoreOpen(true)}
                  className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-[12px] text-ink active:scale-95"
                >
                  {store}
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  onClick={() => setTimeOpen(true)}
                  className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-[12px] text-ink active:scale-95"
                >
                  {time}
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {promoteInfo.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-1 flex-col items-center ${i > 0 ? "border-l border-black/[0.06]" : ""}`}
                >
                  <span className="text-xl font-black text-brand">{s.value}</span>
                  <span className="mt-1 text-[12px] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 常用功能 */}
          <section className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <span className="text-[14px] font-bold text-ink">常用功能</span>
            <div className="mt-4 grid grid-cols-4 gap-y-5">
              {promoteInfo.entries.map((e) => {
                const meta = entryMeta[e] ?? { icon: User, color: "#c9302c", href: "" }
                const Icon = meta.icon
                return (
                  <button
                    key={e}
                    type="button"
                    onClick={() => (meta.href ? router.push(meta.href) : showToast(`${e}敬请期待`))}
                    className="flex flex-col items-center gap-2 active:scale-95"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${meta.color}1f` }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.9} style={{ color: meta.color }} />
                    </span>
                    <span className="text-[12px] text-ink">{e}</span>
                  </button>
                )
              })}
            </div>
          </section>
        </main>

        {/* 时间筛选 */}
        <TimeFilterSheet open={timeOpen} value={time} onSelect={setTime} onClose={() => setTimeOpen(false)} />

        {/* 门店筛选 */}
        {storeOpen && (
          <div
            className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40"
            onClick={() => setStoreOpen(false)}
          >
            <div className="rounded-t-2xl bg-white pb-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">选择门店</span>
                <button type="button" onClick={() => setStoreOpen(false)} className="text-[13px] text-muted-foreground">
                  取消
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {storeOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setStore(s)
                      setStoreOpen(false)
                    }}
                    className={`flex w-full items-center px-4 py-3 text-left text-[14px] active:bg-black/[0.03] ${
                      store === s ? "font-semibold text-brand" : "text-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
