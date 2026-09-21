"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Delete } from "lucide-react"
import { PhoneFrame } from "@/components/points-mall/phone-frame"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { Toast } from "./toast"

const CODE_LEN = 4

export function VerifyScreen() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  function input(n: string) {
    if (code.length >= CODE_LEN) return
    setCode((c) => c + n)
  }

  function del() {
    setCode((c) => c.slice(0, -1))
  }

  function confirm() {
    if (code.length < CODE_LEN) {
      showToast("请输入 4 位验证码")
      return
    }
    showToast("验证成功")
    window.setTimeout(() => router.push("/lottery/select"), 600)
  }

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0", "ok"]

  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col overflow-hidden bg-[#d5342b] text-white">
        {/* 海报背景 */}
        <img
          src="/lottery/verify-bg.png"
          alt="迈极炫冰爽槟榔海报"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* 状态栏 */}
        <div className="relative z-10">
          <StatusBar dark />
        </div>

        {/* 导航栏 */}
        <div className="relative z-10 flex items-center justify-between px-4 pb-2 pt-2">
          <button
            type="button"
            aria-label="返回"
            onClick={() => router.push("/lottery")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 active:scale-90"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className="text-[17px] font-semibold">输入验证码</span>
          <Capsule dark />
        </div>

        {/* 海报主体占位 */}
        <div className="relative z-10 flex-1" aria-hidden />

        {/* 底部键盘面板 */}
        <div className="relative z-20 rounded-t-3xl bg-[#eef1f5] px-4 pb-6 pt-4 text-ink">
          <p className="text-center text-[13px] text-muted-foreground">刮开内袋涂层，输入 4 位验证码</p>

          {/* 验证码输入框 */}
          <div className="mt-3 flex justify-center gap-3">
            {Array.from({ length: CODE_LEN }).map((_, i) => (
              <div
                key={i}
                className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 bg-white text-2xl font-bold text-ink ${
                  i === code.length ? "border-brand" : "border-black/10"
                }`}
              >
                {code[i] ?? ""}
              </div>
            ))}
          </div>

          {/* 数字键盘 */}
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {keys.map((k) => {
              if (k === "del") {
                return (
                  <button
                    key={k}
                    type="button"
                    aria-label="删除"
                    onClick={del}
                    className="brand-gradient flex h-12 items-center justify-center rounded-xl text-white transition active:scale-95"
                  >
                    <Delete className="h-5 w-5" />
                  </button>
                )
              }
              if (k === "ok") {
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={confirm}
                    className="gold-gradient glow-gold flex h-12 items-center justify-center rounded-xl text-base font-bold text-[#7a4a12] transition active:scale-95"
                  >
                    确定
                  </button>
                )
              }
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => input(k)}
                  className="brand-gradient flex h-12 items-center justify-center rounded-xl text-xl font-bold text-white transition active:scale-95"
                >
                  {k}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
