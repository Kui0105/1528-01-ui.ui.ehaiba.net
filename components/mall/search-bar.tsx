'use client'

import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <div
      onClick={() => {
        location.href = 'search.html'
      }}
      className="mx-3 mb-3 flex cursor-pointer items-center gap-2 rounded-[10px] border-[0.5px] border-black/[0.08] bg-white px-3 py-2.5 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99]"
      data-page-node-id="qyeSB9dYLZiqgNhpOUIVbm"
    >
      <span className="flex-shrink-0" data-page-node-id="yMAjL01ABWhVLSWGkNIYFd">
        <Search className="h-4 w-4 text-[#999]" strokeWidth={2} />
      </span>
      <span className="text-sm text-[#999]" data-page-node-id="9axuLVrcXBfzFFWAfYRW2n">
        搜索积分商品
      </span>
    </div>
  )
}
