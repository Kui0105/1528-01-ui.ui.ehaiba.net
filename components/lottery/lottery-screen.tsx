"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { PhoneFrame } from "@/components/points-mall/phone-frame"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { AuthModal } from "./auth-modal"
import { Toast } from "./toast"

export function LotteryScreen() {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  function onLottery() {
    if (!loggedIn) {
      setShowAuth(true)
    } else {
      router.push("/lottery/verify")
    }
  }

  function doAuth() {
    setShowAuth(false)
    setLoggedIn(true)
    showToast("登录成功")
    window.setTimeout(() => router.push("/lottery/verify"), 600)
  }

  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col overflow-hidden bg-black text-white">
        {/* 全屏海报背景 */}
        <Image
          src="/lottery/poster-bg.png"
          alt=""
          fill
          priority
          sizes="440px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* 状态栏 */}
        <div className="relative z-10">
          <StatusBar dark />
        </div>

        {/* 导航栏 */}
        <div className="relative z-10 flex items-center justify-between px-4 pb-3 pt-2">
          <button
            type="button"
            aria-label="返回积分商城"
            onClick={() => router.push("/")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
          <span className="text-[17px] font-semibold drop-shadow">迈极炫</span>
          <Capsule dark />
        </div>

        {/* 海报主体 */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="gold-gradient bg-clip-text text-6xl font-black tracking-tight text-transparent drop-shadow-[0_2px_12px_rgba(212,168,67,0.45)]">
            迈极炫
          </div>
          <p className="mt-4 text-lg font-medium tracking-wide text-white/90">扫码赢好礼 · 即刻开抽</p>

          <button
            type="button"
            onClick={onLottery}
            className="brand-gradient glow-brand mt-14 rounded-full px-16 py-4 text-xl font-bold text-white ring-2 ring-white/30 transition-transform active:scale-95"
          >
            立即抽奖
          </button>
        </div>
      </div>

      <AuthModal open={showAuth} onAuth={doAuth} onClose={() => setShowAuth(false)} />
      <Toast message={toast} />
    </PhoneFrame>
  )
}
