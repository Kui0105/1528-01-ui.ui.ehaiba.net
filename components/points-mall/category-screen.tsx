"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { ProductCard } from "./product-card"
import { SortBar, type SortDir } from "./sort-bar"
import { goods } from "@/lib/points-mall-data"

export function CategoryScreen() {
  const params = useSearchParams()
  const name = params.get("name") ?? "全部分类"
  const [sort, setSort] = useState(0)
  const [dir, setDir] = useState<SortDir>("desc")

  // 综合 / 销量（兑换量）/ 价格（积分），支持升降序
  const list = useMemo(() => {
    const arr = [...goods]
    if (sort === 1) arr.sort((a, b) => (dir === "desc" ? b.ex - a.ex : a.ex - b.ex))
    if (sort === 2) arr.sort((a, b) => (dir === "desc" ? b.points - a.points : a.points - b.points))
    return arr
  }, [sort, dir])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={name} />

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
            {list.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}
