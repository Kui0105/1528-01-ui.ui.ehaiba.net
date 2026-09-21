import { Suspense } from "react"
import { DealerStoreStockScreen } from "@/components/points-mall/dealer-store-stock-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DealerStoreStockScreen />
    </Suspense>
  )
}
