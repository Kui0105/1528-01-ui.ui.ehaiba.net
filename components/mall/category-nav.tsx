'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { categories } from '@/lib/mall-data'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 5
const pages = Array.from({ length: Math.ceil(categories.length / PAGE_SIZE) }, (_, p) =>
  categories.slice(p * PAGE_SIZE, p * PAGE_SIZE + PAGE_SIZE)
)

export function CategoryNav() {
  const [page, setPage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const p = Math.round(el.scrollLeft / (el.clientWidth - 1))
    setPage(p)
  }

  return (
    <div
      data-page-node-id="LGzpmo7EUN34B48DF9MsG7"
      className="mx-3 mb-3 rounded-2xl border border-black/5 bg-white/95 p-3.5 pt-4 shadow-card"
    >
      <div
        ref={scrollRef}
        id="navScroll"
        data-page-node-id="GOmxcEytUEFvD7is7HXzlT"
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {pages.map((group, gi) => (
          <div
            key={gi}
            data-page-node-id={gi === 0 ? 'huYn50ybI50ZAkbDnEVUK4' : undefined}
            className="grid min-w-full snap-start grid-cols-5 gap-y-4"
          >
            {group.map((c) => (
              <a
                key={c.nodeId}
                href={c.href}
                data-page-node-id={c.nodeId}
                className="group flex cursor-pointer flex-col items-center gap-1.5"
              >
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-gold-pale/60 to-white shadow-[0_3px_10px_-4px_rgba(201,154,70,0.5)] ring-1 ring-black/5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-card-hover group-active:scale-95">
                  <Image
                    src={c.icon || '/placeholder.svg'}
                    alt={c.name}
                    width={44}
                    height={44}
                    className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-110"
                  />
                </span>
                <span className="text-xs font-medium text-ink">{c.name}</span>
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex items-center justify-center">
        <div id="navDots" data-page-node-id="wnZtz5gapOx7VWrKmTw1GW" className="flex gap-1.5">
          {pages.map((_, i) => (
            <i
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === page ? 'w-4 bg-brand' : 'w-1.5 bg-black/15'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
