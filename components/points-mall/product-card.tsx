"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Goods } from "@/lib/points-mall-data"

export function ProductCard({ item }: { item: Goods }) {
  const router = useRouter()
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white text-left card-soft">
      <button
        type="button"
        onClick={() => router.push(`/goods/${item.id}`)}
        className="relative aspect-square w-full bg-muted transition-transform active:scale-[0.98]"
      >
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          sizes="(max-width: 480px) 50vw, 200px"
          className="object-cover"
        />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-1 text-sm font-medium text-ink">{item.name}</h3>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-bold text-brand">
              {item.points.toLocaleString()} <span className="text-xs font-medium">积分</span>
            </span>
            <span className="text-[11px] text-muted-foreground line-through">{item.orig}</span>
          </div>
          <span className="text-[11px] text-muted-foreground">已兑 {item.ex}</span>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/goods/${item.id}`)}
          className="brand-gradient glow-brand mt-1 w-full rounded-full py-2 text-xs font-semibold text-white transition-transform active:scale-[0.97]"
        >
          立即兑换
        </button>
      </div>
    </div>
  )
}
