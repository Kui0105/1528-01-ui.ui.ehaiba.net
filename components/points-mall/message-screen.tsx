"use client"

import { useState } from "react"
import { PhoneFrame } from "./phone-frame"
import { BottomNav } from "./bottom-nav"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { messages } from "@/lib/points-mall-data"
import { cn } from "@/lib/utils"

const tabs = [
  { key: "order", label: "订单消息" },
  { key: "warning", label: "预警消息" },
] as const

export function MessageScreen() {
  const [tab, setTab] = useState<"order" | "warning">("order")
  const list = messages.filter((m) => m.tab === tab)

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

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          {list.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted-foreground">暂无消息</p>
          ) : (
            <ul className="space-y-3">
              {list.map((m) => (
                <li key={m.id} className="rounded-2xl bg-white p-4 card-soft">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-ink">{m.title}</h3>
                    {m.unread && <span className="h-2 w-2 rounded-full bg-brand" aria-label="未读" />}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{m.body}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">
                      {m.tag}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{m.time}</span>
                  </div>
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
