"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.push("/search")}
      className="flex h-9 w-full items-center gap-2 rounded-full bg-white/80 px-4 text-left text-sm text-muted-foreground backdrop-blur card-soft"
    >
      <Search className="h-4 w-4 text-brand" />
      <span>搜索积分商品</span>
    </button>
  )
}
