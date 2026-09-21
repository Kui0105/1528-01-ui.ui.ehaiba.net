"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Pencil } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { addresses } from "@/lib/points-mall-data"

export function AddressScreen() {
  const router = useRouter()
  const [toast, setToast] = useState("")

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="我的地址" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          <div className="flex flex-col gap-3">
            {addresses.map((a) => (
              <div key={a.id} className="rounded-2xl bg-white p-4 card-soft">
                <div className="flex items-center gap-3">
                  <span className="text-[15px] font-bold text-ink">{a.name}</span>
                  <span className="text-[13px] text-muted-foreground">{a.phone}</span>
                  {a.isDefault && (
                    <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[11px] font-medium text-brand">默认</span>
                  )}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {a.region} {a.detail}
                </p>
                <div className="mt-3 flex items-center justify-end border-t border-black/[0.06] pt-3">
                  <button
                    type="button"
                    onClick={() => router.push(`/address-edit?id=${a.id}`)}
                    className="flex items-center gap-1 text-[13px] text-muted-foreground active:opacity-70"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    编辑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 底部新增按钮 */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-black/[0.06] bg-white px-4 py-3">
          <button
            type="button"
            onClick={() => showToast("新增地址敬请期待")}
            className="brand-gradient glow-brand flex w-full items-center justify-center gap-2 rounded-full py-3 text-base font-bold text-white active:scale-[0.98]"
          >
            <Plus className="h-5 w-5" />
            新增收货地址
          </button>
        </div>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
