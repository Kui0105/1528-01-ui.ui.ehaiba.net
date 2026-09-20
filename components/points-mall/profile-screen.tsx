"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { BottomNav } from "./bottom-nav"
import { myPoints, orderEntries, profileMenu } from "@/lib/points-mall-data"

export function ProfileScreen() {
  const router = useRouter()

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        {/* 品牌红头部 + 用户信息 */}
        <div className="brand-gradient shrink-0 text-white">
          <div className="flex items-center justify-between px-4 pt-2.5 text-[13px] font-medium tabular-nums">
            <span>10:25</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-3.5 rounded-[2px] bg-white/80" aria-hidden />
              <span className="inline-block h-2.5 w-5 rounded-[3px] border border-white/70" aria-hidden />
            </span>
          </div>
          <div className="relative flex h-11 items-center justify-center">
            <span className="text-[17px] font-semibold">我的</span>
            <button type="button" className="absolute right-4 text-[13px] text-white/90">
              设置
            </button>
          </div>
          <div className="flex items-center gap-3 px-5 pb-6 pt-2">
            <div className="h-14 w-14 overflow-hidden rounded-full bg-white/20 ring-2 ring-white/50">
              <Image src="/avatar-placeholder.png" alt="用户头像" width={56} height={56} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold">微信用户_abc123</span>
              <span className="mt-0.5 text-[13px] text-white/80">138****8888</span>
            </div>
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-24 pt-0">
          {/* 我的订单卡 */}
          <section className="-mt-3 rounded-2xl bg-white p-4 card-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">我的订单</h2>
              <button type="button" className="flex items-center text-[12px] text-muted-foreground">
                全部 <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4">
              {orderEntries.map((o) => (
                <button key={o.key} type="button" className="flex flex-col items-center gap-1.5">
                  <span className="text-2xl">{o.icon}</span>
                  <span className="text-[12px] text-ink">{o.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 积分卡 */}
          <section className="mt-3 flex items-center justify-between rounded-2xl bg-white p-4 card-soft">
            <div className="flex flex-col">
              <span className="text-[12px] text-muted-foreground">我的积分</span>
              <span className="text-xl font-black text-brand">{myPoints.toLocaleString()}</span>
            </div>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="brand-gradient glow-brand rounded-full px-5 py-2 text-sm font-semibold text-white"
            >
              去兑换
            </button>
          </section>

          {/* 功能菜单 */}
          <section className="mt-3 overflow-hidden rounded-2xl bg-white card-soft">
            {profileMenu.map((m, i) => (
              <button
                key={m.key}
                type="button"
                onClick={() => m.href && router.push(m.href)}
                className={`flex w-full items-center gap-3 px-4 py-3.5 ${
                  i > 0 ? "border-t border-black/[0.05]" : ""
                }`}
              >
                <span className="text-lg">{m.icon}</span>
                <span className="flex-1 text-left text-sm text-ink">{m.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </section>
        </main>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
          <BottomNav active="profile" />
        </div>
      </div>
    </PhoneFrame>
  )
}
