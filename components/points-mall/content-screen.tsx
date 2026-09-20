"use client"

import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import type { ContentSection } from "@/lib/dealer-data"

export function ContentScreen({
  title,
  heading,
  sections,
  footer,
}: {
  title: string
  heading?: string
  sections: ContentSection[]
  footer?: string
}) {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={title} />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-8">
          <div className="rounded-2xl bg-white p-4 card-soft">
            {heading && <h1 className="mb-3 text-center text-[16px] font-bold text-ink">{heading}</h1>}

            {sections.map((s, i) => (
              <section key={i} className={i > 0 ? "mt-5" : ""}>
                {s.title && <h2 className="text-[14px] font-bold text-ink">{s.title}</h2>}

                {s.paragraphs?.map((p, j) => (
                  <p key={j} className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}

                {s.items && (
                  <ol className="mt-2 flex flex-col gap-2">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground">
                        <span className="font-semibold text-brand">{j + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}

            {footer && (
              <p className="mt-5 border-t border-black/[0.06] pt-3 text-center text-[12px] text-muted-foreground/70">
                {footer}
              </p>
            )}
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}
