"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { settingsInfo } from "@/lib/points-mall-data"

export function SettingsScreen() {
  const router = useRouter()
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="个人设置" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          <section className="overflow-hidden rounded-2xl bg-white card-soft">
            <Row label="头像" onClick={() => showToast("修改头像敬请期待")}>
              <span className="h-8 w-8 overflow-hidden rounded-full">
                <Image src="/avatar-placeholder.png" alt="头像" width={32} height={32} className="h-full w-full object-cover" />
              </span>
            </Row>
            <Row label="昵称" onClick={() => showToast("修改昵称敬请期待")} border>
              <span className="text-[13px] text-muted-foreground">{settingsInfo.nickname}</span>
            </Row>
            <Row label="手机号" onClick={() => showToast("绑定手机号敬请期待")} border>
              <span className="text-[13px] text-muted-foreground">{settingsInfo.phone}</span>
            </Row>
          </section>

          <section className="mt-3 overflow-hidden rounded-2xl bg-white card-soft">
            <Row label="收货地址" onClick={() => router.push("/address")} />
            <Row label="清除缓存" onClick={() => showToast("已清除缓存")} border />
          </section>
        </main>

        {/* 退出登录 */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
          <button
            type="button"
            onClick={() => showToast("已退出登录")}
            className="w-full rounded-full bg-brand py-3 text-base font-bold text-white active:scale-[0.98]"
          >
            退出登录
          </button>
        </div>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}

function Row({
  label,
  children,
  onClick,
  border,
}: {
  label: string
  children?: React.ReactNode
  onClick?: () => void
  border?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center px-4 py-3.5 text-left active:bg-black/[0.03] ${
        border ? "border-t border-black/[0.05]" : ""
      }`}
    >
      <span className="text-[14px] text-ink">{label}</span>
      <span className="ml-auto flex items-center gap-2">
        {children}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </span>
    </button>
  )
}
