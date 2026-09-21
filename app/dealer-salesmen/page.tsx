import { Suspense } from "react"
import { DealerSalesmenScreen } from "@/components/points-mall/dealer-salesmen-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DealerSalesmenScreen />
    </Suspense>
  )
}
