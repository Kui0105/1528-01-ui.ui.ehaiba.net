'use client'

import Image from 'next/image'
import { CATEGORIES } from '@/lib/mall-data'

export function CategoryNav() {
  return (
    <div
      className="mx-3 mb-3 rounded-xl border-[0.5px] border-black/[0.08] bg-white p-3.5 shadow-sm"
      data-page-node-id="LGzpmo7EUN34B48DF9MsG7"
    >
      <div
        id="navScroll"
        className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-page-node-id="GOmxcEytUEFvD7is7HXzlT"
      >
        <div
          className="grid min-w-full grid-cols-5 gap-y-3.5"
          data-page-node-id="huYn50ybI50ZAkbDnEVUK4"
        >
          {CATEGORIES.map((c) => (
            <div
              key={c.nodeId}
              onClick={() => {
                location.href = c.href
              }}
              className="group flex cursor-pointer flex-col items-center gap-1.5"
              data-page-node-id={c.nodeId}
            >
              <div
                className="h-11 w-11 overflow-hidden rounded-[14px] shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-active:scale-95"
                data-page-node-id={c.iconNodeId}
              >
                <Image
                  src={c.icon || '/placeholder.svg'}
                  alt={c.name}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="text-xs text-[#333] transition-colors group-hover:text-[#c9302c]"
                data-page-node-id={c.nameNodeId}
              >
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-center" data-page-node-id="y07ozvtvLlTXdCF2D1SY3h">
        <div className="flex gap-[5px]" id="navDots" data-page-node-id="wnZtz5gapOx7VWrKmTw1GW">
          <i className="h-[5px] w-[5px] rounded-full bg-[#c9302c]" data-page-node-id="L55AgniEKmDJ3D1fGd01Hi" />
          <i className="h-[5px] w-[5px] rounded-full bg-black/15" data-page-node-id="oiCsCyPL535kambC7015HQ" />
        </div>
      </div>
    </div>
  )
}
