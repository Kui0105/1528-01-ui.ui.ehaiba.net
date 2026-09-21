"use client"

import { useState } from "react"
import { ScanLine, X, CheckCircle2 } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"

export function ScanFlowScreen({
  title,
  hint,
  scanTip,
  successTitle,
  successDesc,
  buttonText,
}: {
  title: string
  hint: string
  scanTip: string
  successTitle: string
  successDesc: string
  buttonText: string
}) {
  const [scanning, setScanning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={title} />

        <main className="flex flex-1 flex-col items-center px-6 pt-10">
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand/10">
            <ScanLine className="h-12 w-12 text-brand" strokeWidth={1.6} />
          </span>
          <p className="mt-6 text-center text-[15px] font-semibold text-ink">{title}</p>
          <p className="mt-2 text-center text-[13px] leading-relaxed text-muted-foreground">{hint}</p>

          {count > 0 && (
            <div className="mt-6 w-full rounded-2xl bg-white p-4 text-center card-soft">
              <span className="text-[13px] text-muted-foreground">本次已处理</span>
              <p className="mt-1 text-2xl font-black text-brand">{count} 件</p>
            </div>
          )}
        </main>

        {/* 底部扫码按钮 */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
          <button
            type="button"
            onClick={() => setScanning(true)}
            className="brand-gradient glow-brand flex w-full items-center justify-center gap-2 rounded-full py-3 text-base font-bold text-white active:scale-[0.98]"
          >
            <ScanLine className="h-5 w-5" />
            {buttonText}
          </button>
        </div>

        {/* 扫码弹层 */}
        {scanning && (
          <div className="absolute inset-0 z-40 flex flex-col bg-black/85">
            <div className="flex items-center justify-between px-4 pt-12 text-white">
              <span className="text-[15px]">{title}</span>
              <button type="button" onClick={() => setScanning(false)} aria-label="关闭" className="active:scale-90">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              <div className="relative h-56 w-56 rounded-2xl border-2 border-white/70">
                <span className="scan-line absolute inset-x-2 top-2 h-0.5 rounded bg-brand" />
              </div>
              <p className="text-[13px] text-white/80">{scanTip}</p>
              <button
                type="button"
                onClick={() => {
                  setScanning(false)
                  setSuccess(true)
                  setCount((c) => c + 1)
                }}
                className="rounded-full bg-white px-6 py-2 text-[14px] font-semibold text-ink active:scale-95"
              >
                模拟扫码
              </button>
            </div>
          </div>
        )}

        {/* 处理成功 */}
        {success && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 px-8">
            <div className="w-full rounded-2xl bg-white px-6 py-7 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-[#3fae6f]" />
              <p className="mt-3 text-[16px] font-bold text-ink">{successTitle}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{successDesc}</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="flex-1 rounded-full border border-black/10 py-2.5 text-[14px] text-ink active:scale-95"
                >
                  完成
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false)
                    setScanning(true)
                  }}
                  className="brand-gradient flex-1 rounded-full py-2.5 text-[14px] font-semibold text-white active:scale-95"
                >
                  继续扫码
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}
