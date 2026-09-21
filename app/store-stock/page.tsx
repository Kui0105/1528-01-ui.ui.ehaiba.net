import { Suspense } from "react"
import { StoreStockScreen } from "@/components/points-mall/store-stock-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <StoreStockScreen />
    </Suspense>
  )
}
