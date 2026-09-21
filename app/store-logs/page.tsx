import { Suspense } from "react"
import { StoreLogsScreen } from "@/components/points-mall/store-logs-screen"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <StoreLogsScreen />
    </Suspense>
  )
}
