import { Suspense } from "react"
import { PurchaseOrderDetailScreen } from "@/components/points-mall/purchase-order-detail-screen"

export default function PurchaseOrderDetailPage() {
  return (
    <Suspense>
      <PurchaseOrderDetailScreen kind="purchase" />
    </Suspense>
  )
}
