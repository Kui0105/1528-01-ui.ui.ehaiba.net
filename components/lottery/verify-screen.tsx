"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Delete } from "lucide-react"
import { PhoneFrame } from "@/components/points-mall/phone-frame"
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
        {/* 红色渐变海报背景 */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#e6463b_0%,#d5342b_50%,#b62419_100%)]"
          aria-hidden
        />

        {/* 状态栏 */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-3 text-xs font-medium">
          <span>10:25</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-white/70" aria-hidden />
            <span className="h-2.5 w-4 rounded-sm border border-white/70" aria-hidden />
          </span>
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
          <div className="flex h-9 items-center rounded-full border border-white/40 bg-white/10 backdrop-blur">
            <span className="px-2.5 text-xs tracking-widest">•••</span>
            <span className="h-4 w-px bg-white/40" aria-hidden />
            <span className="flex items-center justify-center px-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
            </span>
          </div>
        </div>

        {/* 品牌标题 */}
        <div className="relative z-10 mt-16 flex flex-1 flex-col items-center px-6 text-center">
          <div
            className="bg-[linear-gradient(180deg,#fff6dd_0%,#ffe4a3_42%,#f2b957_78%,#d98a2b_100%)] bg-clip-text text-5xl font-black leading-none tracking-wide text-transparent drop-shadow-[0_2px_6px_rgba(90,20,10,0.5)]"
            style={{ WebkitTextStroke: "0.5px rgba(120,50,10,0.35)" }}
          >
            迈极炫
          </div>
          <p className="mt-4 text-[13px] font-medium tracking-[0.18em] text-[#ffe6b8]">扫码赢好礼 · 即刻开抽</p>
        </div>

        {/* 底部键盘面板 */}
        <div className="relative z-10 rounded-t-3xl bg-[#eef1f5] px-4 pb-6 pt-4 text-ink">
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
