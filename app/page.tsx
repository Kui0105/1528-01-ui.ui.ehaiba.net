import { BannerCarousel } from '@/components/mall/banner-carousel'
import { CategoryNav } from '@/components/mall/category-nav'
import { MallHeader } from '@/components/mall/mall-header'
import { RecommendList } from '@/components/mall/recommend-list'
import { ScanFab } from '@/components/mall/scan-fab'
import { SearchBar } from '@/components/mall/search-bar'
import { StatusBar } from '@/components/mall/status-bar'
import { TabBar } from '@/components/mall/tab-bar'
import { ToastProvider } from '@/components/mall/toast-provider'

export default function MallHomePage() {
  return (
    <main className="flex min-h-screen justify-center bg-[#eceef1]">
      <div
        className="relative flex h-screen max-h-[900px] min-h-screen w-full max-w-[420px] flex-col overflow-hidden bg-[#f5f6f7]"
        data-page-node-id="L4ibDf5zkOFsZngmHv3Bis"
      >
        <ToastProvider>
          <div className="bg-gradient-to-b from-[#c9302c] to-[#d84740]">
            <StatusBar />
            <MallHeader />
          </div>

          <div
            className="flex-1 overflow-y-auto pb-20 pt-3 [-webkit-overflow-scrolling:touch]"
            data-page-node-id="dJRxqOdHW8OTxfGlr6Rmv9"
          >
            <SearchBar />
            <BannerCarousel />
            <CategoryNav />
            <RecommendList />
          </div>

          <TabBar />
          <ScanFab />
        </ToastProvider>
      </div>
    </main>
  )
}
