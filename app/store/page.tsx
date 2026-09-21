import { Suspense } from "react"
import { StoreScreen } from "@/components/points-mall/store-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <StoreScreen />
    </Suspense>
  )
}
