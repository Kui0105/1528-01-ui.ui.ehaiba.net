import { Suspense } from "react"
import { SalesRegionScreen } from "@/components/points-mall/sales-region-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SalesRegionScreen />
    </Suspense>
  )
}
