import { Suspense } from "react"
import { DealerStoresScreen } from "@/components/points-mall/dealer-stores-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DealerStoresScreen />
    </Suspense>
  )
}
