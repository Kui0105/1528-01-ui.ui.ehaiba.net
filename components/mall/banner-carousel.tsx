'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { banners } from '@/lib/mall-data'
import { cn } from '@/lib/utils'

export function BannerCarousel() {
  const [cur, setCur] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // banner 每 2 秒自动轮播（保持原型逻辑）
    timer.current = setInterval(() => {
      setCur((c) => (c + 1) % banners.length)
    }, 2000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  return (
    <div
      data-page-node-id="PvnPNgVSYtCjKDDQMAkWeB"
      className="relative mx-3 mb-3 h-[150px] overflow-hidden rounded-2xl border border-black/5 shadow-card"
    >
      <div
        id="bannerTrack"
        data-page-node-id="MHP8Yy5AFAgVUu1kEAIavT"
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${cur * 100}%)` }}
      >
        {banners.map((b) => (
          <div key={b.nodeId} data-page-node-id={b.nodeId} className="relative min-w-full">
            <Image
              src={b.image || '/placeholder.svg'}
              alt={b.label}
              fill
              sizes="420px"
              className="object-cover"
              priority
            />
            {/* 光泽扫过质感 */}
            <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent [animation:mall-shimmer_3.5s_ease-in-out_infinite]" />
          </div>
        ))}
      </div>

      <div
        id="bannerDots"
        data-page-node-id="tvMMZukXfJ8y1TRHPOBeiS"
        className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5"
      >
        {banners.map((b, i) => (
          <button
            key={b.nodeId}
            aria-label={`切换到第 ${i + 1} 张`}
            onClick={() => setCur(i)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === cur ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
            )}
          />
        ))}
      </div>
    </div>
  )
}
