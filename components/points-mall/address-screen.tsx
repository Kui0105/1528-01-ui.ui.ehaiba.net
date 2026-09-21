"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, MapPin } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { addresses as initialAddresses, type Address } from "@/lib/points-mall-data"

export function AddressScreen() {
  const router = useRouter()
  const [toast, setToast] = useState("")
  const [list, setList] = useState<Address[]>(initialAddresses)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  function setDefault(id: string) {
    setList((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))
    showToast("已设为默认地址")
  }

  function remove(id: string) {
    setList((prev) => prev.filter((a) => a.id !== id))
    setConfirmId(null)
    showToast("地址已删除")
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="我的地址" />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 pt-24 text-muted-foreground">
              <MapPin className="h-12 w-12 opacity-30" />
              <p className="text-[13px]">还没有收货地址，快去新增吧</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {list.map((a) => (
                <div key={a.id} className="rounded-2xl bg-white p-4 card-soft">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-ink">{a.name}</span>
                    <span className="text-[13px] text-muted-foreground">{a.phone}</span>
                  </div>
                  <div className="mt-2 flex items-start gap-1.5">
                    {a.isDefault && (
                      <span className="mt-0.5 shrink-0 rounded bg-brand/10 px-1.5 py-0.5 text-[11px] font-medium text-brand">
                        默认
                      </span>
                    )}
                    <p className="text-[13px] leading-relaxed text-muted-foreground">
                      {a.region} {a.detail}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-3">
                    <button
                      type="button"
                      onClick={() => setDefault(a.id)}
                      disabled={a.isDefault}
                      className={`flex items-center gap-1.5 text-[13px] active:opacity-70 ${
                        a.isDefault ? "text-brand" : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          a.isDefault ? "border-brand bg-brand" : "border-black/25"
                        }`}
                      >
                        {a.isDefault && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                      {a.isDefault ? "默认地址" : "设为默认"}
                    </button>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => router.push(`/address-edit?id=${a.id}`)}
                        className="flex items-center gap-1 text-[13px] text-muted-foreground active:opacity-70"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmId(a.id)}
                        className="flex items-center gap-1 text-[13px] text-muted-foreground active:opacity-70"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* 底部新增按钮 */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-black/[0.06] bg-white px-4 py-3">
          <button
            type="button"
            onClick={() => router.push("/address-edit")}
            className="brand-gradient glow-brand flex w-full items-center justify-center gap-2 rounded-full py-3 text-base font-bold text-white active:scale-[0.98]"
          >
            <Plus className="h-5 w-5" />
            新增收货地址
          </button>
        </div>

        {/* 删除二次确认 */}
        {confirmId && (
          <div className="absolute inset-0 z-30 flex items-end bg-black/40" onClick={() => setConfirmId(null)}>
            <div
              className="w-full rounded-t-2xl bg-white p-5 pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-center text-[15px] font-bold text-ink">确认删除该地址？</p>
              <p className="mt-1.5 text-center text-[13px] text-muted-foreground">删除后不可恢复</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmId(null)}
                  className="flex-1 rounded-full border border-black/10 py-2.5 text-[15px] font-medium text-ink active:opacity-70"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => remove(confirmId)}
                  className="flex-1 rounded-full bg-brand py-2.5 text-[15px] font-bold text-white active:opacity-90"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
