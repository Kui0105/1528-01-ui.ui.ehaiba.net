"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { PhoneFrame } from "@/components/points-mall/phone-frame"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { ruleSections } from "@/lib/points-mall-data"

export function RuleScreen() {
  const router = useRouter()

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-white">
        {/* 白底头部 */}
        <div className="shrink-0 bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.05)]">
          <StatusBar />
          <div className="relative flex h-11 items-center justify-center">
            <button
              type="button"
              aria-label="返回"
              onClick={() => router.back()}
              className="absolute left-3 flex h-9 w-9 items-center justify-center rounded-full text-ink active:scale-90"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-[17px] font-semibold">活动规则</span>
            <div className="absolute right-3">
              <Capsule />
            </div>
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-6">
            {ruleSections.map((sec) => (
              <section key={sec.title}>
                <h2 className="flex items-center gap-2 text-[15px] font-bold text-ink">
                  <span className="h-3.5 w-1 rounded-full bg-brand" />
                  {sec.title}
                </h2>
                <ol className="mt-2.5 space-y-2 pl-1 text-[13px] leading-relaxed text-muted-foreground">
                  {sec.items.map((it, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0 font-semibold text-brand">{i + 1}.</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
          <p className="mt-8 text-center text-[12px] text-muted-foreground">最终解释权归迈极炫所有</p>
        </main>
      </div>
    </PhoneFrame>
  )
}
