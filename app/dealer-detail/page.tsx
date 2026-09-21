import { Suspense } from "react"
import { DealerDetailScreen } from "@/components/points-mall/dealer-detail-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DealerDetailScreen />
    </Suspense>
  )
}
