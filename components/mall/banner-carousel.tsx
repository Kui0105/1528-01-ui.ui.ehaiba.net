'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BANNERS } from '@/lib/mall-data'

export function BannerCarousel() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCur((c) => (c + 1) % BANNERS.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative mx-3 mb-3 h-[140px] overflow-hidden rounded-xl border-[0.5px] border-black/[0.08] shadow-sm"
      data-page-node-id="PvnPNgVSYtCjKDDQMAkWeB"
    >
      <div
        id="bannerTrack"
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${cur * 100}%)` }}
        data-page-node-id="MHP8Yy5AFAgVUu1kEAIavT"
      >
        {BANNERS.map((b) => (
          <div
            key={b.nodeId}
            className="relative h-full min-w-full"
            data-page-node-id={b.nodeId}
          >
            <Image
              src={b.src || '/placeholder.svg'}
              alt={b.alt}
              fill
              priority
              sizes="420px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div
        id="bannerDots"
        className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5"
        data-page-node-id="tvMMZukXfJ8y1TRHPOBeiS"
      >
        {BANNERS.map((b, i) => (
          <button
            key={b.nodeId}
            aria-label={`切换到 ${b.alt}`}
            onClick={() => setCur(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === cur ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
