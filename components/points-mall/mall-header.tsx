import Image from "next/image"
import { myPoints } from "@/lib/points-mall-data"
import { SearchBar } from "./search-bar"
import { StatusBar, Capsule } from "@/components/shared/wechat-chrome"

export function MallHeader() {
  return (
    <header className="text-white drop-shadow-sm">
      <StatusBar dark />

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

        <div className="shrink-0">
          <Capsule dark />
        </div>
      </div>
    </header>
  )
}
