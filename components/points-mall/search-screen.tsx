"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { ProductCard } from "./product-card"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { SortBar, type SortDir } from "./sort-bar"
import { hotKeywords, goods } from "@/lib/points-mall-data"

export function SearchScreen() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [submitted, setSubmitted] = useState("")
  const [sort, setSort] = useState(0)
  const [dir, setDir] = useState<SortDir>("desc")

  const results = useMemo(() => {
    if (!submitted) return []
    const arr = goods.filter((g) => g.name.includes(submitted))
    const base = arr.length ? arr : goods
    const copy = [...base]
    if (sort === 1) copy.sort((a, b) => (dir === "desc" ? b.ex - a.ex : a.ex - b.ex))
    if (sort === 2) copy.sort((a, b) => (dir === "desc" ? b.points - a.points : a.points - b.points))
    return copy
  }, [submitted, sort, dir])

  function search(term: string) {
    const t = term.trim()
    if (!t) return
    setQ(t)
    setSubmitted(t)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        {/* 标题栏 */}
        <MobileNavBar title="搜索" onBack={() => router.back()} />

        {/* 标题栏下方：搜索栏 + 搜索按钮 */}
        <div className="flex shrink-0 items-center gap-2 border-b border-black/[0.06] bg-white px-3 py-2.5">
          <div className="flex h-9 flex-1 items-center gap-2 rounded-full bg-muted px-3.5 text-sm text-ink">
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
            className="brand-gradient shrink-0 rounded-full px-5 py-2 text-sm font-semibold text-white active:scale-95"
          >
            搜索
          </button>
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
            <SortBar
              active={sort}
              dir={dir}
              onChange={(i, d) => {
                setSort(i)
                setDir(d)
              }}
            />
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
