import { Suspense } from "react"
import { SearchScreen } from "@/components/points-mall/search-screen"

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchScreen />
    </Suspense>
  )
}
