import { Suspense } from "react"
import { StoreEditScreen } from "@/components/points-mall/store-edit-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <StoreEditScreen />
    </Suspense>
  )
}
