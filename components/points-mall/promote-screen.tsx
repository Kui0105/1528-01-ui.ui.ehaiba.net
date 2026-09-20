"use client"

import { useState } from "react"
import { ChevronRight, User, PackageCheck, Undo2, BadgeCheck, Store, Boxes } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { promoteInfo } from "@/lib/points-mall-data"

const entryMeta = [
  { icon: PackageCheck, color: "#c9302c" },
  { icon: Undo2, color: "#e8833a" },
  { icon: BadgeCheck, color: "#3fae6f" },
  { icon: Store, color: "#4f7fd6" },
  { icon: Boxes, color: "#2fa39a" },
]

export function PromoteScreen() {
  const [toast, setToast] = useState("")

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
            onClick={() => showToast("积分明细敬请期待")}
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
            <span className="text-[14px] font-bold text-ink">推广数据</span>
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
              {promoteInfo.entries.map((e, i) => {
                const meta = entryMeta[i % entryMeta.length]
                const Icon = meta.icon
                return (
                  <button
                    key={e}
                    type="button"
                    onClick={() => showToast(`${e}敬请期待`)}
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
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
