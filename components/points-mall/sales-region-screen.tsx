"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, ChevronRight, MapPin } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { salesProvinces } from "@/lib/points-mall-data"
import { RegionMetric } from "./sales-screen"

export function SalesRegionScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const pid = params.get("pid")
  const cid = params.get("cid")

  const province = useMemo(() => salesProvinces.find((p) => p.id === pid), [pid])
  const city = useMemo(() => {
    if (!cid) return undefined
    for (const p of salesProvinces) {
      const found = p.cities.find((c) => c.id === cid)
      if (found) return found
    }
    return undefined
  }, [cid])

  // 经销商列表：指定城市则取该城市，否则汇总全部（用于消息预警入口）
  const dealers = useMemo(() => {
    if (city) return city.dealers
    if (!pid && !cid) return salesProvinces.flatMap((p) => p.cities.flatMap((c) => c.dealers))
    return []
  }, [city, pid, cid])

  const isDealerView = Boolean(city) || (!pid && !cid)
  const title = city ? city.name : province ? province.name : "经销商列表"

  const [keyword, setKeyword] = useState("")
  const filteredDealers = useMemo(() => {
    const kw = keyword.trim()
    if (!kw) return dealers
    return dealers.filter((d) => d.name.includes(kw) || d.contact.includes(kw) || d.phone.includes(kw))
  }, [dealers, keyword])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title={title} />

        {/* 经销商列表带搜索 */}
        {isDealerView && (
          <div className="flex shrink-0 items-center gap-2 bg-white px-3 py-2.5">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="请输入经销商名称 / 联系人 / 联系电话"
                className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted-foreground/60"
              />
            </div>
          </div>
        )}

        <main className="no-scrollbar flex-1 overflow-y-auto p-3">
          {!isDealerView && province ? (
            <div className="flex flex-col gap-3">
              {province.cities.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => router.push(`/sales-region?cid=${c.id}`)}
                  className="rounded-2xl bg-white p-4 text-left card-soft active:bg-black/[0.02]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold text-ink">{c.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <RegionMetric metric={c.metric} />
                </button>
              ))}
            </div>
          ) : filteredDealers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 pt-24 text-center">
              <MapPin className="h-12 w-12 text-black/15" />
              <p className="text-[13px] text-muted-foreground">未找到匹配的经销商</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredDealers.map((d) => (
                <div key={d.id} className="rounded-2xl bg-white p-4 card-soft">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-ink">{d.name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        d.status === "启用" ? "bg-brand/10 text-brand" : "bg-black/[0.06] text-muted-foreground"
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col gap-1.5 text-[13px]">
                    <InfoRow label="联系人" value={d.contact} />
                    <InfoRow label="联系电话" value={d.phone} />
                    <InfoRow label="省市" value={d.location} />
                    <InfoRow label="销售区域" value={d.region} />
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-3">
                    <div className="flex items-center gap-4 text-[13px]">
                      <span>
                        <b className="text-brand tabular-nums">{d.salesmen}</b>
                        <span className="text-muted-foreground"> 业务员</span>
                      </span>
                      <span>
                        <b className="text-brand tabular-nums">{d.stores}</b>
                        <span className="text-muted-foreground"> 门店</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => router.push("/store?role=dealer")}
                      className="rounded-full border border-brand px-4 py-1.5 text-[13px] font-semibold text-brand active:scale-95"
                    >
                      查看
                    </button>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center">
      <span className="w-[70px] shrink-0 text-muted-foreground">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  )
}
