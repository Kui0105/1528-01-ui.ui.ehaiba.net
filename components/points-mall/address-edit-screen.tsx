"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { addresses } from "@/lib/points-mall-data"

export function AddressEditScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("id")
  const editing = addresses.find((a) => a.id === editId)

  const [name, setName] = useState(editing?.name ?? "")
  const [phone, setPhone] = useState(editing?.phone ?? "")
  const [region, setRegion] = useState(editing?.region ?? "")
  const [detail, setDetail] = useState(editing?.detail ?? "")
  const [isDefault, setIsDefault] = useState(editing?.isDefault ?? false)
  const [toast, setToast] = useState("")

  function save() {
    if (!name || !phone || !region || !detail) {
      setToast("请完善收货信息")
      window.setTimeout(() => setToast(""), 1600)
      return
    }
    setToast("地址已保存")
    window.setTimeout(() => {
      setToast("")
      router.back()
    }, 1000)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={editing ? "编辑地址" : "新增地址"} />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          <section className="overflow-hidden rounded-2xl bg-white card-soft">
            <Field label="收货人">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入收货人姓名"
                className="w-full bg-transparent text-right text-[14px] text-ink outline-none placeholder:text-muted-foreground/60"
              />
            </Field>
            <Field label="联系电话" border>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                placeholder="请输入手机号"
                className="w-full bg-transparent text-right text-[14px] text-ink outline-none placeholder:text-muted-foreground/60"
              />
            </Field>
            <button
              type="button"
              onClick={() => {
                setRegion("湖南省 长沙市 岳麓区")
                setToast("已选择所在地区")
                window.setTimeout(() => setToast(""), 1200)
              }}
              className="flex w-full items-center border-t border-black/[0.05] px-4 py-3.5 text-left active:bg-black/[0.03]"
            >
              <span className="w-24 shrink-0 text-[14px] text-ink">所在地区</span>
              <span className={`flex-1 text-right text-[14px] ${region ? "text-ink" : "text-muted-foreground/60"}`}>
                {region || "请选择省/市/区"}
              </span>
              <ChevronRight className="ml-1 h-4 w-4 text-muted-foreground" />
            </button>
            <div className="flex items-start border-t border-black/[0.05] px-4 py-3.5">
              <span className="w-24 shrink-0 text-[14px] text-ink">详细地址</span>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                rows={2}
                placeholder="街道、门牌号等详细信息"
                className="flex-1 resize-none bg-transparent text-right text-[14px] text-ink outline-none placeholder:text-muted-foreground/60"
              />
            </div>
          </section>

          <div className="mt-3 flex items-center justify-between rounded-2xl bg-white px-4 py-3.5 card-soft">
            <span className="text-[14px] text-ink">设为默认地址</span>
            <button
              type="button"
              role="switch"
              aria-checked={isDefault}
              onClick={() => setIsDefault((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition-colors ${isDefault ? "bg-brand" : "bg-black/15"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  isDefault ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </main>

        <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
          <button
            type="button"
            onClick={save}
            className="brand-gradient glow-brand w-full rounded-full py-3 text-base font-bold text-white active:scale-[0.98]"
          >
            保存
          </button>
        </div>
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}

function Field({ label, children, border }: { label: string; children: React.ReactNode; border?: boolean }) {
  return (
    <div className={`flex items-center px-4 py-3.5 ${border ? "border-t border-black/[0.05]" : ""}`}>
      <span className="w-24 shrink-0 text-[14px] text-ink">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  )
}
