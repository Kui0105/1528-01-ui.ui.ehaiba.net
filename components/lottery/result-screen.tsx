"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, PartyPopper, Coins, Frown, Package } from "lucide-react"
import { PhoneFrame } from "@/components/points-mall/phone-frame"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"

type ResultType = "prize" | "points" | "none"

const config: Record<
  ResultType,
  { icon: typeof PartyPopper; title: string; desc: string; badge: string; badgeSub: string }
> = {
  prize: {
    icon: PartyPopper,
    title: "恭喜中奖",
    desc: "您抽中了实物大奖，请到门店核验兑换",
    badge: "加 5 元兑换槟榔一包",
    badgeSub: "凭此页面到线下门店核验",
  },
  points: {
    icon: Coins,
    title: "获得积分",
    desc: "积分已发放至您的账户，可在积分商城兑换",
    badge: "+50 积分",
    badgeSub: "已存入积分账户",
  },
  none: {
    icon: Frown,
    title: "谢谢参与",
    desc: "很遗憾未中奖，期待下次好运",
    badge: "谢谢参与",
    badgeSub: "下次再接再厉",
  },
}

export function ResultScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const initial = (params.get("type") as ResultType) || "prize"
  const [type, setType] = useState<ResultType>(initial)
  const c = config[type]
  const Icon = c.icon

  return (
    <PhoneFrame>
      <div className="brand-gradient flex h-full flex-col text-white">
        {/* 品牌红头部 */}
        <div className="shrink-0 text-white">
          <StatusBar dark />
          <div className="relative flex h-11 items-center justify-center">
            <button
              type="button"
              aria-label="返回"
              onClick={() => router.push("/lottery")}
              className="absolute left-3 flex h-9 w-9 items-center justify-center rounded-full text-white active:scale-90"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-[17px] font-semibold">抽奖结果</span>
            <div className="absolute right-3">
              <Capsule dark />
            </div>
          </div>

          {/* 品牌信息 */}
          <div className="px-6 pb-6 pt-2 text-center">
            <div
              className="bg-[linear-gradient(180deg,#fff6dd_0%,#ffe4a3_60%,#f2b957_100%)] bg-clip-text text-4xl font-black tracking-wide text-transparent"
              style={{ WebkitTextStroke: "0.5px rgba(120,50,10,0.25)" }}
            >
              迈极炫
            </div>
            <p className="mt-2 text-[13px] text-white/85">扫码赢好礼 · 惊喜即刻开启</p>
          </div>

          {/* 结果态切换（演示用） */}
          <div className="flex justify-center gap-2 pb-4">
            {(["prize", "points", "none"] as ResultType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-full px-3.5 py-1 text-[12px] font-medium transition ${
                  type === t ? "bg-white text-brand" : "bg-white/15 text-white/80"
                }`}
              >
                {config[t].title}
              </button>
            ))}
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-4">
          {/* 结果卡 */}
          <section className="rounded-3xl bg-white p-6 text-center card-soft">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Icon className="h-10 w-10" />
            </div>
            <h1 className="mt-4 text-xl font-black text-ink">{c.title}</h1>
            <p className="mt-1.5 text-[13px] text-muted-foreground">{c.desc}</p>

            <div className="mt-5 rounded-2xl bg-muted px-4 py-5">
              <p className="text-lg font-black text-brand">{c.badge}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">{c.badgeSub}</p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-muted-foreground">
              <span>微信用户_abc123</span>
              <span className="h-3 w-px bg-black/10" aria-hidden />
              <span>2026.09.20 02:35</span>
            </div>

            <div className="mt-4 flex justify-center gap-6 text-[13px] font-medium text-brand">
              <button type="button" onClick={() => router.push("/lottery/records")}>
                中奖记录 &gt;
              </button>
              <button type="button" onClick={() => router.push("/lottery/rule")}>
                活动规则 &gt;
              </button>
            </div>
          </section>

          {/* 商品信息 */}
          <section className="mt-3 rounded-3xl bg-white p-4 card-soft">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
              <Package className="h-4 w-4 text-brand" />
              商品信息
            </h2>
            <div className="flex items-center gap-3 rounded-2xl bg-muted p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl">📦</div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-ink">迈极炫·槟榔</span>
                <span className="mt-0.5 text-[11px] text-muted-foreground">规格：15颗/袋 · 批次：XJM20260827001</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="brand-gradient glow-brand mt-4 w-full rounded-full py-3 text-sm font-bold text-white transition active:scale-[0.98]"
            >
              点击进入积分商城
            </button>
          </section>
        </main>
      </div>
    </PhoneFrame>
  )
}
