"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { banners } from "@/lib/points-mall-data"
import { cn } from "@/lib/utils"

export function BannerCarousel() {
  const router = useRouter()
  const [cur, setCur] = useState(0)

  // 原型：2s 自动播放
  useEffect(() => {
    const timer = setInterval(() => setCur((c) => (c + 1) % banners.length), 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="overflow-hidden">
      <div className="relative aspect-[750/500]">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${cur * 100}%)` }}
        >
          {banners.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => router.push("/category")}
              className="relative h-full w-full shrink-0"
            >
              <Image src={b.image || "/placeholder.svg"} alt={b.alt} fill priority className="object-cover" />
            </button>
          ))}
        </div>

        {/* dots */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {banners.map((b, i) => (
            <span
              key={b.id}
              className={cn("h-1.5 rounded-full bg-white/60 transition-all", i === cur ? "w-4 bg-white" : "w-1.5")}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
