"use client"

import { useState } from "react"
import { Search, Plus, Boxes, FileText, Pencil, Trash2, Store as StoreIcon, X } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { stores, storeStock, storeSalesOrders } from "@/lib/dealer-data"

type Sheet =
  | { kind: "stock"; storeName: string }
  | { kind: "sales"; storeName: string }
  | { kind: "edit"; storeName: string; owner: string; phone: string; address: string }
  | { kind: "add" }
  | null

export function StoreScreen() {
  const [keyword, setKeyword] = useState("")
  const [toast, setToast] = useState("")
  const [sheet, setSheet] = useState<Sheet>(null)
  const [confirmDel, setConfirmDel] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  const list = stores.filter((s) => s.name.includes(keyword) || s.address.includes(keyword))

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="门店管理" />

        {/* 搜索 */}
        <div className="flex shrink-0 items-center gap-2 bg-white px-3 py-2.5">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索门店名称 / 地址"
              className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-foreground/60"
            />
          </div>
          <button
            type="button"
            onClick={() => showToast("搜索完成")}
            className="brand-gradient rounded-full px-4 py-2 text-[13px] font-semibold text-white active:scale-95"
          >
            搜索
          </button>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          <div className="flex flex-col gap-3">
            {list.map((s) => (
              <div key={s.id} className="rounded-2xl bg-white p-4 card-soft">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                    <StoreIcon className="h-6 w-6 text-brand" strokeWidth={1.9} />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-ink">{s.name}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                          s.status === "启用" ? "bg-[#3fae6f]/15 text-[#3fae6f]" : "bg-black/10 text-muted-foreground"
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                    <span className="mt-1 text-[12px] text-muted-foreground">{s.address}</span>
                    <span className="mt-0.5 text-[12px] text-muted-foreground">
                      {s.owner} · {s.phone}
                    </span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 border-t border-black/[0.06] pt-3">
                  <Action icon={Boxes} label="库存" onClick={() => setSheet({ kind: "stock", storeName: s.name })} />
                  <Action icon={FileText} label="销售单" onClick={() => setSheet({ kind: "sales", storeName: s.name })} />
                  <Action
                    icon={Pencil}
                    label="编辑"
                    onClick={() => setSheet({ kind: "edit", storeName: s.name, owner: s.owner, phone: s.phone, address: s.address })}
                  />
                  <Action icon={Trash2} label="删除" danger onClick={() => setConfirmDel(s.name)} />
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 新增按钮 */}
        <button
          type="button"
          onClick={() => setSheet({ kind: "add" })}
          className="brand-gradient glow-brand absolute bottom-5 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full text-white active:scale-90"
          aria-label="新增门店"
        >
          <Plus className="h-7 w-7" />
        </button>

        {/* 库存 / 销售单 / 编辑 / 新增 抽屉 */}
        {sheet && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setSheet(null)}>
            <div className="max-h-[80%] overflow-hidden rounded-t-2xl bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">
                  {sheet.kind === "stock" && `${sheet.storeName} · 门店库存`}
                  {sheet.kind === "sales" && `${sheet.storeName} · 销售单`}
                  {sheet.kind === "edit" && "编辑门店"}
                  {sheet.kind === "add" && "新增门店"}
                </span>
                <button type="button" onClick={() => setSheet(null)} aria-label="关闭">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="no-scrollbar max-h-[60vh] overflow-y-auto p-4">
                {sheet.kind === "stock" && (
                  <div className="flex flex-col gap-2.5">
                    {storeStock.map((it) => (
                      <div key={it.name} className="flex items-center justify-between rounded-xl bg-muted px-3.5 py-3">
                        <span className="text-[14px] text-ink">{it.name}</span>
                        <span className="text-[15px] font-black text-brand">
                          {it.stock}
                          <span className="ml-0.5 text-[12px] font-normal text-muted-foreground">{it.unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {sheet.kind === "sales" && (
                  <div className="flex flex-col gap-2.5">
                    {storeSalesOrders.map((o) => (
                      <div key={o.no} className="rounded-xl bg-muted p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-muted-foreground tabular-nums">{o.no}</span>
                          <span className="text-[12px] text-muted-foreground">{o.date}</span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-[14px] text-ink">{o.product}</span>
                          <span className="text-[14px] font-bold text-brand">×{o.qty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(sheet.kind === "edit" || sheet.kind === "add") && (
                  <div className="flex flex-col gap-3">
                    <Field label="门店名称" defaultValue={sheet.kind === "edit" ? sheet.storeName : ""} placeholder="请输入门店名称" />
                    <Field label="负责人" defaultValue={sheet.kind === "edit" ? sheet.owner : ""} placeholder="请输入负责人" />
                    <Field label="联系电话" defaultValue={sheet.kind === "edit" ? sheet.phone : ""} placeholder="请输入联系电话" />
                    <Field label="门店地址" defaultValue={sheet.kind === "edit" ? sheet.address : ""} placeholder="请输入详细地址" />
                  </div>
                )}
              </div>

              {(sheet.kind === "edit" || sheet.kind === "add") && (
                <div className="border-t border-black/[0.06] p-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSheet(null)
                      showToast(sheet.kind === "edit" ? "门店已更新" : "门店已新增")
                    }}
                    className="brand-gradient glow-brand w-full rounded-full py-3 text-[15px] font-bold text-white active:scale-[0.98]"
                  >
                    保存
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 删除确认 */}
        {confirmDel && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 px-8">
            <div className="w-full rounded-2xl bg-white px-6 py-6 text-center">
              <p className="text-[16px] font-bold text-ink">删除门店</p>
              <p className="mt-2 text-[13px] text-muted-foreground">确认删除「{confirmDel}」吗？删除后不可恢复</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmDel(null)}
                  className="flex-1 rounded-full border border-black/10 py-2.5 text-[14px] text-ink active:scale-95"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmDel(null)
                    showToast("已删除")
                  }}
                  className="brand-gradient flex-1 rounded-full py-2.5 text-[14px] font-semibold text-white active:scale-95"
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

function Action({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: typeof Boxes
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 active:scale-95 ${danger ? "text-brand" : "text-muted-foreground"}`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.8} />
      <span className="text-[11px]">{label}</span>
    </button>
  )
}

function Field({ label, defaultValue, placeholder }: { label: string; defaultValue?: string; placeholder?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="rounded-xl bg-muted px-3.5 py-2.5 text-[14px] text-ink outline-none placeholder:text-muted-foreground/60"
      />
    </label>
  )
}
