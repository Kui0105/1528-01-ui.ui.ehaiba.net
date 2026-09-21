import { MallHeader } from "./mall-header"
import { BannerCarousel } from "./banner-carousel"
import { CategoryNav } from "./category-nav"
import { ProductCard } from "./product-card"
import { BottomNav } from "./bottom-nav"
import { goods } from "@/lib/points-mall-data"

export function PointsMallScreen() {
  return (
    <div className="relative flex h-full flex-col bg-background">
      <main className="no-scrollbar flex-1 overflow-y-auto">
        <div className="relative">
          <BannerCarousel />
          <div className="absolute inset-x-0 top-0 z-20">
            <MallHeader />
          </div>
        </div>
        <div className="flex flex-col gap-3 px-4 pb-28 pt-3">
          <CategoryNav />

          <section className="mt-1">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
              <span className="h-4 w-1 rounded-full bg-brand" />
              推荐兑换
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {goods.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-4">
        <BottomNav />
      </div>
    </div>
  )
}
