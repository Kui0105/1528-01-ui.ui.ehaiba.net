import { Suspense } from "react"
import { OrdersScreen } from "@/components/points-mall/orders-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrdersScreen />
    </Suspense>
  )
}
