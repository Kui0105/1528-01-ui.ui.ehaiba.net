import { Suspense } from "react"
import { OrderDetailScreen } from "@/components/points-mall/order-detail-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderDetailScreen />
    </Suspense>
  )
}
