"use client"

import { useState } from "react"
import { Search, Plus, Boxes, FileText, Pencil, Trash2, Store as StoreIcon } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { stores } from "@/lib/dealer-data"

export function StoreScreen() {
  const [keyword, setKeyword] = useState("")
  const [toast, setToast] = useState("")

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
                  <Action icon={Boxes} label="库存" onClick={() => showToast("门店库存敬请期待")} />
                  <Action icon={FileText} label="销售单" onClick={() => showToast("销售单敬请期待")} />
                  <Action icon={Pencil} label="编辑" onClick={() => showToast("编辑门店敬请期待")} />
                  <Action icon={Trash2} label="删除" danger onClick={() => showToast("已删除")} />
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 新增按钮 */}
        <button
          type="button"
          onClick={() => showToast("新增门店敬请期待")}
          className="brand-gradient glow-brand absolute bottom-5 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full text-white active:scale-90"
          aria-label="新增门店"
        >
          <Plus className="h-7 w-7" />
        </button>
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
