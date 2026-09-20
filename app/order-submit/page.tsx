import { Suspense } from "react"
import { OrderSubmitScreen } from "@/components/points-mall/order-submit-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderSubmitScreen />
    </Suspense>
  )
}
