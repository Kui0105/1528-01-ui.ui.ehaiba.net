"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { ProductCard } from "./product-card"
import { sortTabs, goods } from "@/lib/points-mall-data"
import { cn } from "@/lib/utils"

export function CategoryScreen() {
  const params = useSearchParams()
  const name = params.get("name") ?? "全部分类"
  const [sort, setSort] = useState(0)

  // 简单按排序方式对推荐兑换商品做展示排序（原型为占位数据）
  const list = useMemo(() => {
    const arr = [...goods]
    if (sort === 1) arr.sort((a, b) => b.ex - a.ex)
    if (sort === 2) arr.sort((a, b) => a.points - b.points)
    return arr
  }, [sort])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={name} />

        {/* 排序 Tab */}
        <div className="flex shrink-0 items-center gap-6 border-b border-black/[0.06] bg-white px-5 py-3 text-sm">
          {sortTabs.map((t, i) => (
            <button
              key={t}
              type="button"
              onClick={() => setSort(i)}
              className={cn(
                "flex items-center gap-1 font-medium transition-colors",
                sort === i ? "text-brand" : "text-muted-foreground",
              )}
            >
              {t}
              {i > 0 && <span className="text-[10px] leading-none opacity-60">◆</span>}
            </button>
          ))}
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {list.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}
