import { Suspense } from "react"
import { CategoryScreen } from "@/components/points-mall/category-screen"

export default function CategoryPage() {
  return (
    <Suspense fallback={null}>
      <CategoryScreen />
    </Suspense>
  )
}
