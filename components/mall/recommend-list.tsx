'use client'

import Image from 'next/image'
import { GOODS } from '@/lib/mall-data'

export function RecommendList() {
  return (
    <div className="mx-3" data-page-node-id="ElTuEErrPpeF0GN7UBXesf">
      <div className="mb-2.5 text-[15px] font-medium" data-page-node-id="KVFZcFt59fAyVElBAvPr9Z">
        推荐兑换
      </div>
      <div
        id="recGrid"
        className="grid grid-cols-2 gap-2.5"
        data-page-node-id="4kRZMdr8hu2MswVsbA97YX"
      >
        {GOODS.map((g, i) => (
          <div
            key={g.name}
            onClick={() => {
              location.href = 'goods-detail.html?id=' + i
            }}
            className="group cursor-pointer overflow-hidden rounded-xl border-[0.5px] border-black/[0.08] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
          >
            <div className="aspect-square overflow-hidden bg-[#f5f6f7]">
              <Image
                src={g.img || '/placeholder.svg'}
                alt={g.name}
                width={200}
                height={200}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-2.5">
              <div className="mb-1.5 truncate text-[13px] font-medium text-[#1a1a1a]">
                {g.name}
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#999]">
                <span className="text-[13px] font-semibold text-[#c9302c]">{g.points} 积分</span>
                <span>已兑 {g.ex}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
