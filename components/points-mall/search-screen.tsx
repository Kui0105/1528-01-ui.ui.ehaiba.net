"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronLeft, X } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { ProductCard } from "./product-card"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"
import { hotKeywords, goods, sortTabs } from "@/lib/points-mall-data"
import { cn } from "@/lib/utils"

export function SearchScreen() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [submitted, setSubmitted] = useState("")
  const [sort, setSort] = useState(0)

  const results = useMemo(() => {
    if (!submitted) return []
    const arr = goods.filter((g) => g.name.includes(submitted))
    const base = arr.length ? arr : goods
    const copy = [...base]
    if (sort === 1) copy.sort((a, b) => b.ex - a.ex)
    if (sort === 2) copy.sort((a, b) => a.points - b.points)
    return copy
  }, [submitted, sort])

  function search(term: string) {
    const t = term.trim()
    if (!t) return
    setQ(t)
    setSubmitted(t)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        {/* 品牌红搜索头 */}
        <div className="brand-gradient shrink-0 text-white">
          <StatusBar dark />
          <div className="flex items-center gap-2 px-3 pb-3 pt-2">
            <button
              type="button"
              aria-label="返回"
              onClick={() => router.back()}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white active:scale-90"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex h-9 flex-1 items-center gap-2 rounded-full bg-white px-3.5 text-sm text-ink">
              <Search className="h-4 w-4 text-brand" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) search(q)
                }}
                placeholder="搜索积分商品"
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
              {q && (
                <button type="button" aria-label="清除" onClick={() => setQ("")}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => search(q)}
              className="shrink-0 rounded-full bg-white/20 px-3.5 py-1.5 text-sm font-semibold text-white"
            >
              搜索
            </button>
            <div className="shrink-0">
              <Capsule dark />
            </div>
          </div>
        </div>

        {!submitted ? (
          <main className="flex-1 overflow-y-auto p-4">
            <h2 className="mb-3 text-sm font-semibold text-ink">热门搜索</h2>
            <div className="flex flex-wrap gap-2.5">
              {hotKeywords.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => search(k)}
                  className="rounded-full bg-white px-4 py-1.5 text-[13px] text-ink card-soft transition active:scale-95"
                >
                  {k}
                </button>
              ))}
            </div>
          </main>
        ) : (
          <>
            <div className="flex shrink-0 items-center gap-6 border-b border-black/[0.06] bg-white px-5 py-3 text-sm">
              {sortTabs.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSort(i)}
                  className={cn("font-medium transition-colors", sort === i ? "text-brand" : "text-muted-foreground")}
                >
                  {t}
                </button>
              ))}
            </div>
            <main className="no-scrollbar flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                {results.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </main>
          </>
        )}
      </div>
    </PhoneFrame>
  )
}
