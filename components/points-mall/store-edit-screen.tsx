"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ImagePlus, MapPin, ChevronDown } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { stores, salesmanOptions } from "@/lib/dealer-data"
import { cn } from "@/lib/utils"

export function StoreEditScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get("id")
  const isDealer = params.get("role") === "dealer"
  const store = id ? stores.find((s) => s.id === id) : undefined
  const isEdit = Boolean(store)

  const [name, setName] = useState(store?.name ?? "")
  const [owner, setOwner] = useState(store?.owner ?? "")
  const [phone, setPhone] = useState(store?.phone ?? "")
  const [address, setAddress] = useState(store?.address ?? "")
  const [status, setStatus] = useState<"启用" | "停用">(store?.status ?? "启用")
  const [salesman, setSalesman] = useState(store?.salesman ?? "")
  const [salesmanPicker, setSalesmanPicker] = useState(false)
  const [toast, setToast] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)

  function save() {
    setConfirmOpen(false)
    setToast(isEdit ? "门店已更新" : "门店已新增")
    window.setTimeout(() => router.back(), 900)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={isEdit ? "编辑门店" : "新增门店"} />

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          {/* 门店 Logo */}
          <div className="rounded-2xl bg-white p-4 card-soft">
            <span className="text-[13px] text-muted-foreground">门店 Logo</span>
            <button
              type="button"
              onClick={() => setToast("请选择图片")}
              className="mt-2 flex h-28 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 text-muted-foreground active:scale-[0.99]"
            >
              <ImagePlus className="h-7 w-7" strokeWidth={1.6} />
              <span className="text-[12px]">点击上传门店 Logo</span>
            </button>
          </div>

          {/* 门店照片 */}
          <div className="mt-3 rounded-2xl bg-white p-4 card-soft">
            <span className="text-[13px] text-muted-foreground">门店照片</span>
            <button
              type="button"
              onClick={() => setToast("请选择图片")}
              className="mt-2 flex h-28 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 text-muted-foreground active:scale-[0.99]"
            >
              <ImagePlus className="h-7 w-7" strokeWidth={1.6} />
              <span className="text-[12px]">点击上传门店照片</span>
            </button>
          </div>

          {/* 表单 */}
          <div className="mt-3 flex flex-col gap-4 rounded-2xl bg-white p-4 card-soft">
            <Field label="门店名称" value={name} onChange={setName} placeholder="请输入门店名称" />

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] text-muted-foreground">门店状态</span>
              <div className="flex gap-2.5">
                {(["启用", "停用"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={cn(
                      "flex-1 rounded-full border py-2.5 text-[14px] font-medium transition-colors active:scale-95",
                      status === s ? "border-brand bg-brand/5 text-brand" : "border-black/10 text-muted-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </label>

            {isDealer && (
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] text-muted-foreground">所属业务员</span>
                <button
                  type="button"
                  onClick={() => setSalesmanPicker(true)}
                  className="flex items-center justify-between rounded-xl bg-muted px-3.5 py-2.5 text-[14px]"
                >
                  <span className={salesman ? "text-ink" : "text-muted-foreground/60"}>{salesman || "请选择业务员"}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </label>
            )}

            <Field label="负责人" value={owner} onChange={setOwner} placeholder="请输入负责人" />
            <Field label="联系电话" value={phone} onChange={setPhone} placeholder="请输入联系电话" />

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] text-muted-foreground">门店地址</span>
              <div className="flex items-center gap-2 rounded-xl bg-muted px-3.5 py-2.5">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="请输入详细地址"
                  className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-muted-foreground/60"
                />
                <button
                  type="button"
                  onClick={() => setToast("定位中…")}
                  className="flex shrink-0 items-center gap-1 text-[12px] text-brand active:scale-95"
                >
                  <MapPin className="h-4 w-4" />
                  定位
                </button>
              </div>
            </label>
          </div>
        </main>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-black/[0.06] bg-white/80 p-4 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="brand-gradient glow-brand w-full rounded-full py-3 text-[15px] font-bold text-white active:scale-[0.98]"
          >
            保存
          </button>
        </div>

        {salesmanPicker && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setSalesmanPicker(false)}>
            <div className="rounded-t-2xl bg-white pb-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">选择业务员</span>
                <button type="button" onClick={() => setSalesmanPicker(false)} className="text-[13px] text-muted-foreground">
                  取消
                </button>
              </div>
              {salesmanOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSalesman(s)
                    setSalesmanPicker(false)
                  }}
                  className={`flex w-full items-center px-4 py-3 text-left text-[14px] active:bg-black/[0.03] ${
                    salesman === s ? "font-semibold text-brand" : "text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {confirmOpen && (
          <div className="absolute inset-0 z-30 flex items-end justify-center">
            <button
              type="button"
              aria-label="关闭"
              onClick={() => setConfirmOpen(false)}
              className="absolute inset-0 bg-black/40"
            />
            <div className="relative w-full rounded-t-3xl bg-white p-5 pb-7">
              <h3 className="text-center text-[16px] font-bold text-ink">
                {isEdit ? "确认保存修改？" : "确认新增门店？"}
              </h3>
              <p className="mt-2 text-center text-[13px] text-muted-foreground">
                {isEdit ? "保存后将更新该门店信息" : "保存后将创建新门店"}
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 rounded-full border border-black/10 py-3 text-[15px] font-medium text-muted-foreground active:scale-[0.98]"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={save}
                  className="brand-gradient glow-brand flex-1 rounded-full py-3 text-[15px] font-bold text-white active:scale-[0.98]"
                >
                  确认
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

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl bg-muted px-3.5 py-2.5 text-[14px] text-ink outline-none placeholder:text-muted-foreground/60"
      />
    </label>
  )
}
