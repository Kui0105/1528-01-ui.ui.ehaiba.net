"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Store, ChevronRight } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { getDealerDetail } from "@/lib/points-mall-data"

export function DealerStoresScreen() {
  const params = useSearchParams()
  const id = params.get("id") ?? ""
  const detail = useMemo(() => getDealerDetail(id), [id])

  const [keyword, setKeyword] = useState("")
  const list = useMemo(() => {
    const all = detail?.stores ?? []
    const kw = keyword.trim()
    if (!kw) return all
    return all.filter((s) => s.name.includes(kw) || s.contact.includes(kw) || s.salesman.includes(kw))
  }, [detail, keyword])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="门店数据" />

        {detail && (
          <div className="shrink-0 bg-white px-4 pb-2.5 pt-2 text-[12px] text-muted-foreground">
            {detail.dealer.name} · 门店列表
          </div>
        )}
        <div className="flex shrink-0 items-center gap-2 bg-white px-3 pb-2.5">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索门店名称 / 联系人 / 业务员"
              className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 pt-24 text-center">
              <Store className="h-12 w-12 text-black/15" />
              <p className="text-[13px] text-muted-foreground">未找到匹配的门店</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {list.map((s) => (
                <div key={s.id} className="rounded-2xl bg-white p-4 card-soft">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-ink">{s.name}</span>
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand">
                      {s.status}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col gap-1.5 text-[13px]">
                    <InfoRow label="联系人" value={s.contact} />
                    <InfoRow label="联系电话" value={s.phone} />
                    <InfoRow label="业务员" value={s.salesman} />
                    <InfoRow label="详细地址" value={s.address} />
                    <InfoRow label="创建时间" value={s.createdAt} />
                  </div>
                  <div className="mt-3 grid grid-cols-3 divide-x divide-black/[0.06] border-y border-black/[0.06] py-3">
                    <StatCell label="激活量" value={s.stat.activation} />
                    <StatCell label="动销量" value={s.stat.moving} />
                    <StatCell label="中奖量" value={s.stat.winning} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[13px]">
                    <span className="text-muted-foreground">
                      库存总数 <b className="text-ink tabular-nums">{s.stockTotal}</b> 件
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </PhoneFrame>
  )
}

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-2">
      <span className="text-[18px] font-bold tabular-nums text-brand">{value.toLocaleString()}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start">
      <span className="w-[72px] shrink-0 text-muted-foreground">{label}</span>
      <span className="flex-1 text-ink">{value}</span>
    </div>
  )
}
