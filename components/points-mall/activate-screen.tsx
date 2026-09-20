"use client"

import { useMemo, useState } from "react"
import { Search, ChevronRight, ScanLine, Store as StoreIcon, X, CheckCircle2 } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { stores } from "@/lib/dealer-data"

export function ActivateScreen() {
  const [keyword, setKeyword] = useState("")
  const [scanning, setScanning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeStore, setActiveStore] = useState("")

  const list = useMemo(
    () => stores.filter((s) => s.name.includes(keyword) || s.address.includes(keyword)),
    [keyword],
  )

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="产品激活" />

        {/* 搜索 */}
        <div className="shrink-0 bg-white px-3 py-2.5">
          <div className="flex items-center gap-2 rounded-full bg-muted px-3.5 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索门店名称 / 地址"
              className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          <div className="flex flex-col gap-3">
            {list.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveStore(s.name)
                  setScanning(true)
                }}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 text-left card-soft active:bg-black/[0.02]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                  <StoreIcon className="h-6 w-6 text-brand" strokeWidth={1.9} />
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-[14px] font-semibold text-ink">{s.name}</span>
                  <span className="mt-0.5 text-[12px] text-muted-foreground">累计激活 {s.activated} 件</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </main>

        {/* 底部扫码按钮 */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
          <button
            type="button"
            onClick={() => {
              setActiveStore(stores[0].name)
              setScanning(true)
            }}
            className="brand-gradient glow-brand flex w-full items-center justify-center gap-2 rounded-full py-3 text-base font-bold text-white active:scale-[0.98]"
          >
            <ScanLine className="h-5 w-5" />
            扫码激活
          </button>
        </div>

        {/* 扫码弹层 */}
        {scanning && (
          <div className="absolute inset-0 z-40 flex flex-col bg-black/85">
            <div className="flex items-center justify-between px-4 pt-12 text-white">
              <span className="text-[15px]">扫码激活</span>
              <button type="button" onClick={() => setScanning(false)} aria-label="关闭" className="active:scale-90">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              <div className="relative h-56 w-56 rounded-2xl border-2 border-white/70">
                <span className="scan-line absolute inset-x-2 top-2 h-0.5 rounded bg-brand" />
              </div>
              <p className="text-[13px] text-white/80">将外包装袋二维码放入框内</p>
              <button
                type="button"
                onClick={() => {
                  setScanning(false)
                  setSuccess(true)
                }}
                className="rounded-full bg-white px-6 py-2 text-[14px] font-semibold text-ink active:scale-95"
              >
                模拟扫码
              </button>
            </div>
          </div>
        )}

        {/* 激活成功 */}
        {success && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 px-8">
            <div className="w-full rounded-2xl bg-white px-6 py-7 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-[#3fae6f]" />
              <p className="mt-3 text-[16px] font-bold text-ink">激活成功</p>
              <p className="mt-1 text-[13px] text-muted-foreground">产品已成功激活并归属至「{activeStore}」</p>
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
