"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { PhoneFrame } from "@/components/points-mall/phone-frame"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { Toast } from "./toast"

const prizes = [
  { id: 1, name: "迈极炫", flavor: "橙子味", img: "/lottery/pack-orange.png" },
  { id: 2, name: "迈极炫", flavor: "凤梨味", img: "/lottery/pack-pineapple.png" },
  { id: 3, name: "迈极炫", flavor: "咖啡味", img: "/lottery/pack-coffee.png" },
  { id: 4, name: "迈极炫", flavor: "薄荷味", img: "/lottery/pack-pineapple.png" },
  { id: 5, name: "迈极炫", flavor: "原味", img: "/lottery/pack-coffee.png" },
  { id: 6, name: "迈极炫", flavor: "西瓜味", img: "/lottery/pack-orange.png" },
]

const showcasePrizes = [
  { name: "iPhone 18 Pro Max 1TB", img: "/lottery/prize-iphone.png" },
  { name: "加 5 元兑换价值 50 元迈极炫槟榔一包", img: "/lottery/pack-orange.png" },
  { name: "加 10 元兑换价值 100 元迈极炫槟榔一包", img: "/lottery/pack-coffee.png" },
]

type Phase = "select" | "tear"

export function SelectScreen() {
  const router = useRouter()
  const [active, setActive] = useState(2)
  const [phase, setPhase] = useState<Phase>("select")
  const [progress, setProgress] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [toast, setToast] = useState("")
  const dragX = useRef<number | null>(null)
  const tearStart = useRef<number | null>(null)
  const tearWidth = useRef(1)

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  function go(dir: number) {
    setActive((prev) => Math.min(prizes.length - 1, Math.max(0, prev + dir)))
  }

  /* -------- 阶段一：选奖（coverflow 左右滑动） -------- */
  function onPointerDown(e: React.PointerEvent) {
    if (phase !== "select") return
    dragX.current = e.clientX
  }

  function onPointerUp(e: React.PointerEvent) {
    if (phase !== "select" || dragX.current === null) return
    const delta = e.clientX - dragX.current
    if (delta > 40) go(-1)
    else if (delta < -40) go(1)
    dragX.current = null
  }

  function onCardClick(index: number) {
    if (phase !== "select") return
    if (index !== active) {
      setActive(index)
      return
    }
    startTear()
  }

  // 确认当前选中项，放大进入撕奖阶段
  function startTear() {
    setPhase("tear")
    setProgress(0)
    showToast("按住奖品，从左向右撕开")
  }

  /* -------- 阶段二：撕奖（放大卡片上从左向右拖动） -------- */
  function onTearDown(e: React.PointerEvent) {
    if (phase !== "tear" || animating) return
    tearStart.current = e.clientX
    tearWidth.current = e.currentTarget.getBoundingClientRect().width || 1
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onTearMove(e: React.PointerEvent) {
    if (phase !== "tear" || tearStart.current === null || animating) return
    const delta = e.clientX - tearStart.current
    const p = Math.min(1, Math.max(0, delta / tearWidth.current))
    setProgress(p)
  }

  function onTearUp() {
    if (phase !== "tear" || tearStart.current === null || animating) return
    tearStart.current = null
    if (progress > 0.5) {
      // 撕开成功
      setAnimating(true)
      setProgress(1)
      showToast("恭喜撕开奖品！")
      window.setTimeout(() => {
        router.push("/lottery/result?type=prize")
      }, 900)
    } else {
      // 未过阈值，回弹
      setAnimating(true)
      setProgress(0)
      window.setTimeout(() => setAnimating(false), 300)
    }
  }

  function resetToSelect() {
    setPhase("select")
    setProgress(0)
    setAnimating(false)
  }

  const torn = phase === "tear"
  // 包装层保留的宽度（从左向右撕：右侧包装逐渐被撕掉）
  const wrapVisible = 100 - progress * 100

  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col overflow-hidden bg-[#d5342b] text-white">
        {/* 海报背景（CSS 分层） */}
        {/* 1. 品牌红纵向底色 */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#e6463b_0%,#d5342b_48%,#b62419_100%)]"
          aria-hidden
        />
        {/* 2. 卡片区暖金聚光舞台 */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_58%_at_50%_60%,rgba(255,224,150,0.55)_0%,rgba(240,150,60,0.22)_40%,transparent_68%)]"
          aria-hidden
        />
        {/* 3. 顶部品牌高光晕 */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(80%_100%_at_50%_-10%,rgba(255,200,140,0.45),transparent_72%)]"
          aria-hidden
        />
        {/* 4. 底部压暗 */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(120,24,16,0.45),transparent)]"
          aria-hidden
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
            onClick={() => (torn ? resetToSelect() : router.push("/lottery"))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition active:scale-90"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="text-[17px] font-semibold">抽奖</span>
          <Capsule dark />
        </div>

        {/* 右侧金色竖排标签 */}
        <div className="absolute right-0 top-40 z-20 flex flex-col gap-3">
          {[
            { label: "活动规则", href: "/lottery/rule" },
            { label: "中奖记录", href: "/lottery/records" },
          ].map(({ label, href }) => (
            <button
              key={label}
              type="button"
              onClick={() => router.push(href)}
              className="gold-gradient glow-gold flex w-9 flex-col items-center justify-center gap-0.5 rounded-l-xl py-3 text-xs font-semibold leading-none text-[#7a4a12] shadow-md transition active:scale-95"
            >
              {label.split("").map((ch, i) => (
                <span key={i}>{ch}</span>
              ))}
            </button>
          ))}
        </div>

        {/* 标题 */}
        <div className="relative z-10 mt-5 text-center">
          <div
            className="bg-[linear-gradient(180deg,#fff6dd_0%,#ffe4a3_42%,#f2b957_78%,#d98a2b_100%)] bg-clip-text text-[42px] font-black leading-none tracking-wide text-transparent drop-shadow-[0_2px_6px_rgba(90,20,10,0.5)]"
            style={{ WebkitTextStroke: "0.5px rgba(120,50,10,0.35)" }}
          >
            迈极��
          </div>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#f4c66a]/70" aria-hidden />
            <p className="text-[13px] font-medium tracking-[0.18em] text-[#ffe6b8]">扫码赢好礼 · 即刻开抽</p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#f4c66a]/70" aria-hidden />
          </div>

          {/* 活动信息带 */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            {["3 大口味", "100% 必中", "扫码即抽"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#f4c66a]/50 bg-white/10 px-3 py-1 text-[11px] font-medium text-[#ffe6b8] backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 阶段一：coverflow 卡片轮播 */}
        {!torn && (
          <>
          <div
            className="relative z-10 mt-4 flex items-center justify-center"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            {/* 发光舞台 */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-72 -translate-x-1/2 translate-y-[4.5rem] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,220,150,0.55),transparent)] blur-md"
              aria-hidden
            />
            <div className="relative h-64 w-full">
              {prizes.map((p, i) => {
                const offset = i - active
                const abs = Math.abs(offset)
                const hidden = abs > 2
                const scale = offset === 0 ? 1 : Math.max(0.62, 1 - abs * 0.2)
                const opacity = offset === 0 ? 1 : Math.max(0.28, 0.75 - abs * 0.25)
                const translate = offset * 88
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`${p.name} ${p.flavor}`}
                    onClick={() => onCardClick(i)}
                    className="absolute left-1/2 top-1/2 h-60 w-44 rounded-3xl transition-all duration-300 ease-out"
                    style={{
                      transform: `translate(calc(-50% + ${translate}px), -50%) scale(${scale})`,
                      opacity: hidden ? 0 : opacity,
                      zIndex: 10 - abs,
                      pointerEvents: hidden ? "none" : "auto",
                    }}
                  >
                    <div
                      className={`relative h-full w-full overflow-hidden rounded-3xl border bg-white ${
                        offset === 0
                          ? "border-white shadow-[0_18px_44px_-10px_rgba(0,0,0,0.55)] ring-2 ring-[#f4c66a]"
                          : "border-white/40"
                      }`}
                    >
                      <img
                        src={p.img || "/placeholder.svg"}
                        alt={`${p.name} ${p.flavor}`}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                      {offset !== 0 && <span className="absolute inset-0 bg-[#a5241f]/25" aria-hidden />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 立即撕开按钮（紧贴卡片下方） */}
          <div className="relative z-10 mt-6 flex justify-center">
            <button
              type="button"
              onClick={startTear}
              className="flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ffe58a_0%,#ffc44d_48%,#ff9e2c_100%)] px-10 py-3 text-base font-black tracking-widest text-[#8a3b00] shadow-[0_8px_24px_-4px_rgba(255,170,60,0.7)] ring-1 ring-white/50 transition active:scale-95"
            >
              立即撕开
            </button>
          </div>

          {/* 奖品信息展示 */}
          <div className="relative z-10 mt-6 px-6">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#f4c66a]/70" aria-hidden />
              <p className="text-xs font-semibold tracking-[0.2em] text-[#ffe6b8]">奖品一览</p>
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#f4c66a]/70" aria-hidden />
            </div>
            <ul className="grid grid-cols-3 gap-3">
              {showcasePrizes.map((p) => (
                <li
                  key={p.name}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-sm"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-white">
                    <img
                      src={p.img || "/placeholder.svg"}
                      alt={p.name}
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                  </div>
                  <span className="text-center text-[11px] font-medium leading-snug text-white/90">{p.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 占位，撑开底部 */}
          <div className="flex-1" aria-hidden />
          </>
        )}

        {/* 阶段二：撕奖 */}
        {torn && (
          <div className="relative z-10 flex flex-1 items-center justify-center">
            <div className="relative h-72 w-52 select-none touch-none">
              {/* 底层：奖品揭晓 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-[#f4c66a]/60 bg-[radial-gradient(circle_at_50%_35%,#fff4d6_0%,#f6d68a_55%,#e6b352_100%)] text-center shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)]">
                <span className="text-[11px] font-semibold tracking-widest text-[#a5651a]">恭喜获得</span>
                <span className="mt-1 text-2xl font-black text-[#8a4b12]">{prizes[active].name}</span>
                <span className="mt-1 text-sm font-medium text-[#a5651a]">{prizes[active].flavor}</span>
              </div>

              {/* 顶层：包装袋（从左向右撕，右侧保留部分逐渐减少） */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden rounded-3xl"
                style={{
                  width: `${wrapVisible}%`,
                  transition: animating ? "width 0.35s ease-out" : "none",
                }}
                onPointerDown={onTearDown}
                onPointerMove={onTearMove}
                onPointerUp={onTearUp}
                onPointerCancel={onTearUp}
              >
                <div className="relative h-72 w-52 overflow-hidden rounded-3xl border border-white bg-white shadow-inner">
                  <img
                    src={prizes[active].img || "/placeholder.svg"}
                    alt={`${prizes[active].name} ${prizes[active].flavor}`}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                {/* 撕裂边缘高光 */}
                {progress > 0 && progress < 1 && (
                  <span
                    className="absolute inset-y-0 right-0 w-1 bg-white/70 blur-[1px]"
                    aria-hidden
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* 底部提示（仅撕奖阶段） */}
        {torn && (
          <p className="relative z-10 pb-8 text-center text-xs text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            按住奖品，从左向右滑动撕开包装
          </p>
        )}
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
