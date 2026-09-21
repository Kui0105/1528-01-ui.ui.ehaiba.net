import { Suspense } from "react"
import { AddressEditScreen } from "@/components/points-mall/address-edit-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AddressEditScreen />
    </Suspense>
  )
}
