import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <a
      href="search.html"
      data-page-node-id="qyeSB9dYLZiqgNhpOUIVbm"
      className="group mx-3 mb-3 flex items-center gap-2.5 rounded-full border border-black/5 bg-white/90 px-4 py-2.5 shadow-card transition-all duration-200 active:scale-[0.99] hover:shadow-card-hover"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient">
        <Search className="h-3.5 w-3.5 text-white" strokeWidth={2.6} />
      </span>
      <span data-page-node-id="9axuLVrcXBfzFFWAfYRW2n" className="text-sm text-ink-soft">
        搜索积分商品
      </span>
      <span className="ml-auto rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        搜索
      </span>
    </a>
  )
}
