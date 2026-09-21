"use client"

import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { aboutSections } from "@/lib/points-mall-data"

export function AboutScreen() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="关于我们" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-4 pb-8">
          {/* 品牌标识 */}
          <div className="flex flex-col items-center py-6">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl brand-gradient text-2xl font-black text-white">
              迈
            </span>
            <span className="mt-3 text-[16px] font-bold text-ink">迈极炫</span>
            <span className="mt-1 text-[12px] text-muted-foreground">版本 v0.9.1</span>
          </div>

          <div className="flex flex-col gap-3">
            {aboutSections.map((s) => (
              <section key={s.title} className="rounded-2xl bg-white p-4 card-soft">
                <h2 className="mb-2 flex items-center gap-2 text-[15px] font-bold text-ink">
                  <span className="h-4 w-1 rounded-full bg-brand" />
                  {s.title}
                </h2>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{s.body}</p>
              </section>
            ))}
          </div>

          <p className="mt-6 text-center text-[12px] text-muted-foreground">迈极炫品牌 版权所有</p>
        </main>
      </div>
    </PhoneFrame>
  )
}
