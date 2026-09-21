"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ChevronRight,
  Wallet,
  PackageCheck,
  Truck,
  CircleCheck,
  Megaphone,
  LayoutDashboard,
  BarChart3,
  Coins,
  Gift,
  MapPin,
  Headphones,
  Info,
  Settings,
  type LucideIcon,
} from "lucide-react"
import { PhoneFrame } from "@/components/points-mall/phone-frame"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { BottomNav } from "@/components/points-mall/bottom-nav"
import { Toast } from "@/components/lottery/toast"
import { orderEntries, profileMenu } from "@/lib/points-mall-data"

// 订单入口图标 + 辅助色
const orderMeta: Record<string, { icon: LucideIcon; color: string }> = {
  unpaid: { icon: Wallet, color: "#e0a13a" },
  unshipped: { icon: PackageCheck, color: "#e8833a" },
  shipping: { icon: Truck, color: "#c9302c" },
  done: { icon: CircleCheck, color: "#3fae6f" },
}

// 功能菜单图标 + 辅助色 + 跳转路由
const menuMeta: Record<string, { icon: LucideIcon; color: string; href?: string }> = {
  promo: { icon: Megaphone, color: "#c9302c", href: "/promote" },
  console: { icon: LayoutDashboard, color: "#4f7fd6", href: "/dealer" },
  sales: { icon: BarChart3, color: "#2fa39a", href: "/sales" },
  points: { icon: Coins, color: "#d4a843", href: "/points-detail" },
  records: { icon: Gift, color: "#d9557f", href: "/lottery/records" },
  address: { icon: MapPin, color: "#e8833a", href: "/address" },
  service: { icon: Headphones, color: "#3fae6f" },
  about: { icon: Info, color: "#7b8794", href: "/about" },
}

export function ProfileScreen() {
  const router = useRouter()
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  function open(label: string, href?: string) {
    if (href) router.push(href)
    else showToast(`${label}功能敬请期待`)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        {/* 品牌红头部 */}
        <div className="brand-gradient shrink-0 text-white">
          <StatusBar dark />
          <div className="relative flex h-11 items-center justify-center">
            <span className="text-[17px] font-semibold">我的</span>
            <div className="absolute right-3">
              <Capsule dark />
            </div>
          </div>

          {/* 用户信息 */}
          <div className="flex items-center gap-3 px-5 pb-6 pt-2">
            <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full ring-2 ring-white/60">
              <Image
                src="/avatar-placeholder.png"
                alt="用户头像"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </span>
            <div className="flex flex-1 flex-col">
              <span className="text-lg font-bold">微信用户_abc123</span>
              <span className="mt-1 text-[12px] text-white/80">ID：MJX2026083001</span>
            </div>
            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm active:scale-95"
            >
              <Settings className="h-3.5 w-3.5" />
              设置
            </button>
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-28 pt-3">
          <div className="flex flex-col gap-3">
            {/* 我的订单 */}
            <section className="rounded-2xl bg-white p-4 card-soft">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-ink">我的订单</span>
                <button
                  type="button"
                  onClick={() => router.push("/orders")}
                  className="flex items-center text-[12px] text-muted-foreground active:opacity-70"
                >
                  全部
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-4">
                {orderEntries.map((o) => {
                  const meta = orderMeta[o.key]
                  const Icon = meta.icon
                  return (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => router.push(`/orders?tab=${o.key}`)}
                      className="flex flex-col items-center gap-2 active:scale-95"
                    >
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${meta.color}1f` }}
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.9} style={{ color: meta.color }} />
                      </span>
                      <span className="text-[12px] text-ink">{o.label}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* 功能菜单 */}
            <section className="overflow-hidden rounded-2xl bg-white card-soft">
              {profileMenu.map((m, i) => {
                const meta = menuMeta[m.key]
                const Icon = meta.icon
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => open(m.label, meta.href)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left active:bg-black/[0.03] ${
                      i !== 0 ? "border-t border-black/[0.05]" : ""
                    }`}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${meta.color}1f` }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.9} style={{ color: meta.color }} />
                    </span>
                    <span className="flex-1 text-[14px] text-ink">{m.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                )
              })}
            </section>
          </div>
        </main>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
          <div className="pointer-events-auto">
            <BottomNav active="profile" />
          </div>
        </div>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
