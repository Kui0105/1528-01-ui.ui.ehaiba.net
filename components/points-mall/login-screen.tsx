"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"

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
      <div className="flex h-full flex-col bg-gradient-to-b from-brand/[0.14] via-white to-white">
        <MobileNavBar title="登录" variant="light" />

        <main className="no-scrollbar flex flex-1 flex-col overflow-y-auto px-6">
          <div className="flex flex-col items-center pt-16 text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full shadow-lg shadow-brand/20 ring-4 ring-white">
              <Image src="/og-image.png" alt="迈极炫" fill sizes="96px" className="object-cover" priority />
            </div>
            <h1 className="mt-6 text-[20px] font-bold text-ink">欢迎登录迈极炫</h1>
            <p className="mt-2 text-[13px] text-muted-foreground">登录后可参与抽奖、积分兑换及使用业务控制台</p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-5">
            <button
              type="button"
              onClick={login}
              disabled={loading}
              className="brand-gradient glow-brand w-full rounded-full py-3.5 text-[16px] font-semibold text-white transition active:scale-[0.98] disabled:opacity-80"
            >
              {loading ? "登录中..." : "微信授权一键登录"}
            </button>
            <button
              type="button"
              onClick={() => router.replace("/")}
              className="text-[14px] text-brand transition active:opacity-70"
            >
              暂不登录，继续浏览
            </button>
          </div>

          <div className="mt-auto flex items-start justify-center gap-2 pb-10 pt-8 text-[12px] leading-relaxed text-muted-foreground">
            <button
              type="button"
              role="checkbox"
              aria-checked={agreed}
              aria-label="同意用户协议和隐私政策"
              onClick={() => setAgreed((v) => !v)}
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                agreed ? "border-brand bg-brand" : "border-black/30 bg-white"
              }`}
            >
              {agreed && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
            </button>
            <p>
              <span onClick={() => setAgreed((v) => !v)}>我已阅读并同意</span>
              <Link href="/agreement" className="text-brand">
                《用户协议》
              </Link>
              与
              <Link href="/privacy" className="text-brand">
                《隐私政策》
              </Link>
            </p>
          </div>
        </main>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
