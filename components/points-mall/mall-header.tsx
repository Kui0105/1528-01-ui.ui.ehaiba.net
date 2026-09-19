import Image from "next/image"
import { myPoints } from "@/lib/points-mall-data"
import { SearchBar } from "./search-bar"

export function MallHeader() {
  return (
    <header className="text-white drop-shadow-sm">
      {/* 状态栏 */}
      <div className="flex items-center justify-between px-5 pt-2.5 text-[13px] font-medium tabular-nums">
        <span>10:25</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-3.5 rounded-[2px] bg-white/80" aria-hidden />
          <span className="inline-block h-2.5 w-5 rounded-[3px] border border-white/70" aria-hidden />
        </span>
      </div>

      {/* 导航栏：我的积分 / 胶囊搜索框 / 菜单 */}
      <div className="flex items-center gap-3 px-4 pb-3 pt-2">
        <div className="flex shrink-0 items-center gap-2">
          <div className="h-9 w-9 overflow-hidden rounded-full bg-white/20 ring-2 ring-white/50">
            <Image
              src="/avatar-placeholder.png"
              alt="用户头像"
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] text-white/80">我的积分</span>
            <span className="text-base font-bold tabular-nums">{myPoints.toLocaleString()}</span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>

        <div className="flex h-9 shrink-0 items-center rounded-full border border-white/40 bg-white/10 backdrop-blur">
          <span className="px-2.5 text-xs tracking-widest">•••</span>
          <span className="h-4 w-px bg-white/40" aria-hidden />
          <span className="flex items-center justify-center px-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
          </span>
        </div>
      </div>
    </header>
  )
}
