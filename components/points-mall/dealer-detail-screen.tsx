"use client"

import { useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, User, Store } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { getDealerDetail } from "@/lib/points-mall-data"

export function DealerDetailScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get("id") ?? ""
  const detail = useMemo(() => getDealerDetail(id), [id])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="经销商详情" />

        {!detail ? (
          <div className="flex flex-1 items-center justify-center px-6 text-center text-[13px] text-muted-foreground">
            未找到该经销商数据
          </div>
        ) : (
          <main className="no-scrollbar flex-1 overflow-y-auto p-3">
            {/* 经销商数据统计 */}
            <div className="rounded-2xl bg-white p-4 card-soft">
              <p className="text-[13px] font-semibold text-muted-foreground">经销商数据</p>
              <div className="mt-3 grid grid-cols-3 divide-x divide-black/[0.06]">
                <StatCell label="激活量" value={detail.stat.activation} />
                <StatCell label="动销量" value={detail.stat.moving} />
                <StatCell label="中奖量" value={detail.stat.winning} />
              </div>
            </div>

            {/* 基本信息 */}
            <div className="mt-3 rounded-2xl bg-white p-4 card-soft">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-ink">{detail.dealer.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    detail.dealer.status === "启用"
                      ? "bg-brand/10 text-brand"
                      : "bg-black/[0.06] text-muted-foreground"
                  }`}
                >
                  {detail.dealer.status}
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1.5 text-[13px]">
                <InfoRow label="联系人" value={detail.dealer.contact} />
                <InfoRow label="联系电话" value={detail.dealer.phone} />
                <InfoRow label="省市区" value={detail.dealer.location} />
                <InfoRow label="详细地址" value={`${detail.dealer.location}${detail.dealer.region}`} />
              </div>
            </div>

            {/* 下钻入口 */}
            <div className="mt-3 flex flex-col gap-3">
              <DrillEntry
                icon={<User className="h-5 w-5 text-brand" />}
                label="业务员数据"
                onClick={() => router.push(`/dealer-salesmen?id=${id}`)}
              />
              <DrillEntry
                icon={<Store className="h-5 w-5 text-brand" />}
                label="门店数据"
                onClick={() => router.push(`/dealer-stores?id=${id}`)}
              />
            </div>
          </main>
        )}
      </div>
    </PhoneFrame>
  )
}

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1 px-2">
      <span className="text-[22px] font-bold tabular-nums text-brand">{value.toLocaleString()}</span>
      <span className="text-[12px] text-muted-foreground">{label}</span>
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

function DrillEntry({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between rounded-2xl bg-white p-4 text-left card-soft active:bg-black/[0.02]"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10">{icon}</span>
        <span className="text-[15px] font-semibold text-ink">{label}</span>
      </span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  )
}
