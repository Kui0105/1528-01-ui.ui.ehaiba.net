"use client"

import { useState } from "react"
import { Search, Plus, User, X } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { businessTabs, salesmen } from "@/lib/dealer-data"

type FormSheet = { kind: "edit"; name: string; phone: string } | { kind: "add" } | null

export function BusinessManageScreen() {
  const [tab, setTab] = useState<string>(businessTabs[0])
  const [keyword, setKeyword] = useState("")
  const [confirm, setConfirm] = useState<string | null>(null)
  const [form, setForm] = useState<FormSheet>(null)
  const [toast, setToast] = useState("")

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  const list = salesmen.filter((s) => s.name.includes(keyword) || s.phone.includes(keyword))

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="业务管理" />

        {/* 搜索 + Tab */}
        <div className="shrink-0 bg-white px-3 pb-2 pt-2.5">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索业务员姓名 / 手机号"
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
          <div className="mt-2.5 grid grid-cols-4 gap-2">
            {businessTabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full py-1.5 text-[13px] transition-colors ${
                  tab === t ? "brand-gradient font-semibold text-white" : "bg-muted text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-24">
          <div className="flex flex-col gap-3">
            {list.map((s) => (
              <div key={s.id} className="rounded-2xl bg-white p-4 card-soft">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10">
                    <User className="h-6 w-6 text-brand" strokeWidth={1.9} />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-ink">{s.name}</span>
                      <span className="rounded bg-[#3fae6f]/15 px-1.5 py-0.5 text-[11px] font-medium text-[#3fae6f]">
                        {s.status}
                      </span>
                    </div>
                    <span className="mt-1 text-[12px] text-muted-foreground">手机号 {s.phone}</span>
                    <span className="mt-0.5 text-[12px] text-muted-foreground">管理门店 {s.stores} 家 · 入职 {s.joinDate}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ kind: "edit", name: s.name, phone: s.phone })}
                      className="rounded-full border border-black/10 px-3 py-1 text-[12px] text-ink active:scale-95"
                    >
                      编辑
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirm(s.id)}
                      className="rounded-full border border-brand/40 px-3 py-1 text-[12px] text-brand active:scale-95"
                    >
                      删除
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex items-center border-t border-black/[0.06] pt-3">
                  <Metric label="激活数" value={s.active} />
                  <Metric label="动销数" value={s.sales} border />
                  <Metric label="兑奖数" value={s.prize} border />
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 新增按钮 */}
        <button
          type="button"
          onClick={() => setForm({ kind: "add" })}
          className="brand-gradient glow-brand absolute bottom-5 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full text-white active:scale-90"
          aria-label="新增业务员"
        >
          <Plus className="h-7 w-7" />
        </button>

        {/* 编辑 / 新增 业务员表单 */}
        {form && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setForm(null)}>
            <div className="rounded-t-2xl bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">
                  {form.kind === "edit" ? "编辑业务员" : "新增业务员"}
                </span>
                <button type="button" onClick={() => setForm(null)} aria-label="关闭">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="flex flex-col gap-3 p-4">
                <FormField label="姓名" defaultValue={form.kind === "edit" ? form.name : ""} placeholder="请输入姓名" />
                <FormField label="手机号" defaultValue={form.kind === "edit" ? form.phone : ""} placeholder="请输入手机号" />
                <FormField label="管理门店数" placeholder="请输入门店数量" />
              </div>
              <div className="border-t border-black/[0.06] p-4">
                <button
                  type="button"
                  onClick={() => {
                    setForm(null)
                    showToast(form.kind === "edit" ? "业务员已更新" : "业务员已新增")
                  }}
                  className="brand-gradient glow-brand w-full rounded-full py-3 text-[15px] font-bold text-white active:scale-[0.98]"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 删除确认 */}
        {confirm && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 px-8">
            <div className="w-full rounded-2xl bg-white px-6 py-6 text-center">
              <p className="text-[16px] font-bold text-ink">确认删除</p>
              <p className="mt-2 text-[13px] text-muted-foreground">确定删除该业务员吗？删除后不可恢复。</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirm(null)}
                  className="flex-1 rounded-full border border-black/10 py-2.5 text-[14px] text-ink active:scale-95"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirm(null)
                    showToast("已删除")
                  }}
                  className="brand-gradient flex-1 rounded-full py-2.5 text-[14px] font-semibold text-white active:scale-95"
                >
                  删除
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

function Metric({ label, value, border }: { label: string; value: number; border?: boolean }) {
  return (
    <div className={`flex flex-1 flex-col items-center ${border ? "border-l border-black/[0.06]" : ""}`}>
      <span className="text-lg font-black text-brand tabular-nums">{value}</span>
      <span className="mt-0.5 text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}

function FormField({ label, defaultValue, placeholder }: { label: string; defaultValue?: string; placeholder?: string }) {
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
