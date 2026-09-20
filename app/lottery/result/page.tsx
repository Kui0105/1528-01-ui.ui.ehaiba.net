import { Suspense } from "react"
import { ResultScreen } from "@/components/lottery/result-screen"

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultScreen />
    </Suspense>
  )
}
