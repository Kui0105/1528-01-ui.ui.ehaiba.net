"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PhoneFrame } from "./phone-frame"
import { BottomNav } from "./bottom-nav"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { messages, type MessageRole } from "@/lib/points-mall-data"
import { cn } from "@/lib/utils"

const tabs = [
  { key: "order", label: "订单消息" },
  { key: "warning", label: "预警消息" },
] as const

const roles: { key: MessageRole; label: string }[] = [
  { key: "salesman", label: "业务员" },
  { key: "dealer", label: "经销商" },
  { key: "sales", label: "销售" },
]

export function MessageScreen() {
  const router = useRouter()
  const [tab, setTab] = useState<"order" | "warning">("order")
  const [role, setRole] = useState<MessageRole>("salesman")

  const list = messages.filter((m) => {
    if (m.tab !== tab) return false
    if (tab === "warning") return m.warnRoles?.includes(role)
    return true
  })

  function handleClick(m: (typeof messages)[number]) {
    if (m.tab === "order" && m.orderId) {
      router.push(`/order-detail?id=${m.orderId}`)
      return
    }
    if (m.tab === "warning") {
      // 门店库存不足 → 门店管理列表；经销商库存不足 → 区域详情（销售数据-区域详情）
      if (m.warnType === "dealer") router.push("/sales-region")
      else router.push("/store")
    }
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        {/* 品牌红头部 */}
        <div className="brand-gradient shrink-0 text-white">
          <StatusBar dark />
          <div className="relative flex h-11 items-center justify-center">
            <span className="text-[17px] font-semibold">消息</span>
            <div className="absolute right-3">
              <Capsule dark />
            </div>
          </div>
          {/* Tab */}
          <div className="flex">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className="relative flex-1 pb-2.5 pt-1 text-sm font-medium"
              >
                <span className={tab === t.key ? "text-white" : "text-white/70"}>{t.label}</span>
                {tab === t.key && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 预警消息：身份切换（不同身份预警内容与跳转不同） */}
        {tab === "warning" && (
          <div className="shrink-0 bg-white px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-muted-foreground">当前身份</span>
              <div className="flex flex-1 gap-1.5">
                {roles.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRole(r.key)}
                    className={cn(
                      "flex-1 rounded-full py-1.5 text-[12px] font-medium transition-colors",
                      role === r.key ? "brand-gradient text-white" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-28">
          {list.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted-foreground">暂无消息</p>
          ) : (
            <ul className="space-y-3">
              {list.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => handleClick(m)}
                    className="w-full rounded-2xl bg-white p-4 text-left card-soft transition-transform active:scale-[0.99]"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-ink">{m.title}</h3>
                      {m.unread && <span className="h-2 w-2 rounded-full bg-brand" aria-label="未读" />}
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{m.body}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium",
                          m.warnType === "dealer"
                            ? "bg-amber-500/10 text-amber-600"
                            : m.tab === "warning"
                              ? "bg-orange-500/10 text-orange-600"
                              : "bg-brand/10 text-brand",
                        )}
                      >
                        {m.tag}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-muted-foreground">{m.time}</span>
                        <span className="text-[11px] font-medium text-brand">
                          {m.tab === "order" ? "查看订单 ›" : m.warnType === "dealer" ? "查看区域 ›" : "查看门店 ›"}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </main>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
          <BottomNav active="message" />
        </div>
      </div>
    </PhoneFrame>
  )
}
