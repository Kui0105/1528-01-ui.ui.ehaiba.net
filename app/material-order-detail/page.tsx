import { Suspense } from "react"
import { PurchaseOrderDetailScreen } from "@/components/points-mall/purchase-order-detail-screen"

export default function MaterialOrderDetailPage() {
  return (
    <Suspense>
      <PurchaseOrderDetailScreen kind="material" />
    </Suspense>
  )
}
