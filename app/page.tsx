import { StatusBar } from '@/components/mall/status-bar'
import { NavBar } from '@/components/mall/nav-bar'
import { SearchBar } from '@/components/mall/search-bar'
import { BannerCarousel } from '@/components/mall/banner-carousel'
import { CategoryNav } from '@/components/mall/category-nav'
import { RecommendGrid } from '@/components/mall/recommend-grid'
import { TabBar } from '@/components/mall/tab-bar'
import { ScanFab } from '@/components/mall/scan-fab'
import { Toast } from '@/components/mall/toast'

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-200 sm:py-6">
      {/* 手机容器：设计基准 375px，最大 420px */}
      <div className="paper-texture relative flex h-screen w-full max-w-[420px] flex-col overflow-hidden bg-paper sm:h-[860px] sm:rounded-[2.2rem] sm:shadow-2xl">
        {/* 顶部品牌区（状态栏 + 导航）*/}
        <div className="brand-texture relative flex-shrink-0 bg-brand-gradient">
          <StatusBar />
          <NavBar />
          {/* 底部柔和过渡 */}
          <div className="pointer-events-none absolute -bottom-4 left-0 right-0 h-4 rounded-t-2xl bg-paper" />
        </div>

        {/* 内容区 */}
        <div
          data-page-node-id="dJRxqOdHW8OTxfGlr6Rmv9"
          className="no-scrollbar relative flex-1 overflow-y-auto pb-20 pt-3"
        >
          <SearchBar />
          <BannerCarousel />
          <CategoryNav />
          <RecommendGrid />
        </div>

        <ScanFab />
        <TabBar />
        <Toast />
      </div>
    </main>
  )
}
