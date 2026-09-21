"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { categories } from "@/lib/points-mall-data"

// 原型：分类导航，5 列 2 行网格，点击跳 /category?name=
export function CategoryNav() {
  const router = useRouter()
  return (
    <section className="rounded-3xl bg-white p-3 pt-4 card-soft">
      <div className="grid grid-cols-5 gap-y-4">
        {categories.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => router.push(`/category?name=${encodeURIComponent(c.name)}`)}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.04]">
              <Image
                src={c.icon || "/placeholder.svg"}
                alt={c.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-[11px] text-ink">{c.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
