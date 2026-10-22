"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Gift, Coins, LayoutDashboard } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"

const benefits = [
  { icon: Gift, label: "扫码抽奖" },
  { icon: Coins, label: "积分兑换" },
  { icon: LayoutDashboard, label: "业务控制台" },
]

export function LoginScreen() {
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState("")

  function showToast(message: string, duration = 1600) {
    setToast(message)
    window.setTimeout(() => setToast(""), duration)
  }

  function login() {
    if (!agreed) {
      showToast("请先阅读并同意用户协议和隐私政策")
      return
    }
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setToast("登录成功")
      window.setTimeout(() => {
        setToast("")
        router.replace("/profile")
      }, 900)
    }, 800)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <div className="brand-gradient">
          <MobileNavBar title="微信登录" variant="transparent" />
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          <section className="rounded-3xl bg-white px-6 pb-7 pt-10 card-soft">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-lg shadow-brand/25">
                <Image src="/og-image.png" alt="迈极炫" fill sizes="80px" className="object-cover" priority />
              </div>
              <h1 className="mt-5 text-[22px] font-bold text-ink">迈极炫</h1>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                登录后使用抽奖、积分兑换及业务控制台
              </p>
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-2">
              {benefits.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-brand/[0.06] py-3">
                  <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                  <span className="text-[12px] text-ink">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={login}
                disabled={loading}
                className="brand-gradient glow-brand flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold text-white transition active:scale-[0.98] disabled:opacity-80"
              >
                {loading ? "登录中..." : "微信快捷登录"}
              </button>
              <button
                type="button"
                onClick={() => router.replace("/")}
                className="w-full rounded-full border border-black/15 bg-white py-3.5 text-[15px] text-ink transition active:bg-black/[0.03]"
              >
                暂不登录，继续浏览
              </button>
            </div>

            <div className="mt-6 flex items-start justify-center gap-2 text-[12px] leading-relaxed text-muted-foreground">
              <button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                aria-label="同意用户协议和隐私政策"
                onClick={() => setAgreed((v) => !v)}
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                  agreed ? "border-brand bg-brand" : "border-black/25 bg-white"
                }`}
              >
                {agreed && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </button>
              <p>
                <span onClick={() => setAgreed((v) => !v)}>我已阅读并同意</span>
                <Link href="/agreement" className="text-brand">
                  《用户协议》
                </Link>
                和
                <Link href="/privacy" className="text-brand">
                  《隐私政策》
                </Link>
              </p>
            </div>
          </section>

          <p className="mt-4 text-center text-[11px] text-muted-foreground/70">可暂不登录，继续浏览商城</p>
        </main>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
