"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Package, CheckCircle2, MapPin, ChevronRight } from "lucide-react"
import { PhoneFrame } from "./phone-frame"
import { MobileNavBar } from "@/components/shared/mobile-nav-bar"
import { Toast } from "@/components/lottery/toast"
import { purchaseProducts } from "@/lib/dealer-data"
import { chinaRegions } from "@/lib/china-regions"

type CartItem = { id: string; qty: number }

export function PurchaseOrderCreateScreen() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])

  // 收货信息
  const [contact, setContact] = useState("")
  const [phone, setPhone] = useState("")
  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  const [address, setAddress] = useState("")
  const [remark, setRemark] = useState("")

  // 区域选择器
  const [regionOpen, setRegionOpen] = useState(false)
  const [pickProvince, setPickProvince] = useState("")
  const [pickCity, setPickCity] = useState("")
  const [regionTab, setRegionTab] = useState<"province" | "city" | "district">("province")

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [toast, setToast] = useState("")

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("purchaseCart")
      if (raw) setCart(JSON.parse(raw))
    } catch {
      // ignore
    }
  }, [])

  function showToast(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(""), 1600)
  }

  const lines = useMemo(
    () =>
      cart
        .map((c) => {
          const product = purchaseProducts.find((p) => p.id === c.id)
          return product ? { product, qty: c.qty } : null
        })
        .filter((x): x is { product: (typeof purchaseProducts)[number]; qty: number } => x !== null),
    [cart],
  )

  const totalCount = lines.reduce((sum, l) => sum + l.qty, 0)
  const totalPrice = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)
  const hasItems = lines.length > 0
  const regionText = province ? `${province} ${city} ${district}` : ""

  function openRegion() {
    setPickProvince(province)
    setPickCity(city)
    setRegionTab("province")
    setRegionOpen(true)
  }

  const cityOptions = chinaRegions.find((p) => p.name === pickProvince)?.cities ?? []
  const districtOptions = cityOptions.find((c) => c.name === pickCity)?.districts ?? []

  function handleSubmit() {
    if (!contact.trim()) return showToast("请填写联系人")
    if (!/^1\d{10}$/.test(phone.trim())) return showToast("请填写正确的联系电话")
    if (!province) return showToast("请选择省市区")
    if (!address.trim()) return showToast("请填写详细地址")
    setConfirmOpen(true)
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-muted">
        <MobileNavBar title="新增进货订单" />

        {hasItems ? (
          <>
            <main className="no-scrollbar flex-1 overflow-y-auto p-3 pb-28">
              {/* 收货信息 */}
              <div className="rounded-2xl bg-white p-4 card-soft">
                <div className="mb-3 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand" strokeWidth={2} />
                  <p className="text-[14px] font-bold text-ink">收货信息</p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 py-2.5">
                    <span className="w-[70px] shrink-0 text-[13px] text-muted-foreground">联系人</span>
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="请输入联系人姓名"
                      className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="h-px bg-black/[0.05]" />
                  <div className="flex items-center gap-3 py-2.5">
                    <span className="w-[70px] shrink-0 text-[13px] text-muted-foreground">联系电话</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                      inputMode="numeric"
                      placeholder="请输入手机号码"
                      className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="h-px bg-black/[0.05]" />
                  <button type="button" onClick={openRegion} className="flex items-center gap-3 py-2.5 text-left">
                    <span className="w-[70px] shrink-0 text-[13px] text-muted-foreground">所在地区</span>
                    <span className={`flex-1 text-[14px] ${regionText ? "text-ink" : "text-muted-foreground/50"}`}>
                      {regionText || "请选择省 / 市 / 区"}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                  <div className="h-px bg-black/[0.05]" />
                  <div className="flex flex-col gap-2 py-2.5">
                    <span className="text-[13px] text-muted-foreground">详细地址</span>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={2}
                      placeholder="请输入街道、门牌号等详细地址"
                      className="w-full resize-none rounded-xl bg-muted px-3 py-2.5 text-[14px] leading-relaxed text-ink outline-none placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>
              </div>

              {/* 商品清单 */}
              <div className="mt-3 rounded-2xl bg-white p-4 card-soft">
                <p className="mb-3 text-[14px] font-bold text-ink">商品清单</p>
                <div className="flex flex-col gap-3">
                  {lines.map((l) => (
                    <div
                      key={l.product.id}
                      className="flex items-center gap-3 border-b border-black/[0.05] pb-3 last:border-0 last:pb-0"
                    >
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image src={l.product.image || "/placeholder.svg"} alt={l.product.name} fill className="object-cover" sizes="64px" />
                      </span>
                      <div className="flex flex-1 flex-col">
                        <span className="text-[14px] font-semibold text-ink">{l.product.name}</span>
                        <span className="mt-0.5 text-[12px] text-muted-foreground">{l.product.spec}</span>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-[14px] font-bold text-brand">¥{l.product.price}</span>
                          <span className="text-[13px] text-muted-foreground">×{l.qty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 进货备注 */}
              <div className="mt-3 rounded-2xl bg-white p-4 card-soft">
                <p className="mb-2.5 text-[14px] font-bold text-ink">进货备注</p>
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  rows={3}
                  placeholder="选填，填写对本次进货的特殊说明"
                  className="w-full resize-none rounded-xl bg-muted px-3.5 py-3 text-[13px] text-ink outline-none placeholder:text-muted-foreground/60"
                />
              </div>

              {/* 金额汇总 */}
              <div className="mt-3 rounded-2xl bg-white p-4 card-soft">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground">商品件数</span>
                  <span className="text-ink tabular-nums">{totalCount} 件</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground">进货金额</span>
                  <span className="font-black text-brand">¥{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </main>

            {/* 底部提交栏 */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-black/[0.06] bg-white px-4 py-3">
              <div className="flex flex-col">
                <span className="text-[12px] text-muted-foreground">
                  共 <span className="font-semibold text-ink">{totalCount}</span> 件
                </span>
                <span className="text-[15px] font-black text-brand">合计 ¥{totalPrice.toLocaleString()}</span>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="brand-gradient glow-brand rounded-full px-8 py-2.5 text-[15px] font-bold text-white active:scale-95"
              >
                确认提交
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <Package className="h-14 w-14 text-muted-foreground/40" strokeWidth={1.4} />
            <p className="mt-4 text-[15px] font-semibold text-ink">未获取到进货商品</p>
            <p className="mt-1.5 text-[13px] text-muted-foreground">请返回进货商城重新选择</p>
            <button
              type="button"
              onClick={() => router.push("/purchase-mall")}
              className="brand-gradient mt-5 rounded-full px-8 py-2.5 text-[14px] font-semibold text-white active:scale-95"
            >
              返回进货商城
            </button>
          </div>
        )}

        {/* 省市区三级联动选择弹层 */}
        {regionOpen && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setRegionOpen(false)}>
            <div className="flex max-h-[70%] flex-col rounded-t-2xl bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                <span className="text-[15px] font-semibold text-ink">选择所在地区</span>
                <button type="button" onClick={() => setRegionOpen(false)} className="text-[13px] text-muted-foreground">
                  取消
                </button>
              </div>

              {/* 已选层级 Tab */}
              <div className="flex items-center gap-4 border-b border-black/[0.06] px-4 py-2.5 text-[14px]">
                <button
                  type="button"
                  onClick={() => setRegionTab("province")}
                  className={regionTab === "province" ? "font-semibold text-brand" : "text-muted-foreground"}
                >
                  {pickProvince || "请选择"}
                </button>
                {pickProvince && (
                  <button
                    type="button"
                    onClick={() => setRegionTab("city")}
                    className={regionTab === "city" ? "font-semibold text-brand" : "text-muted-foreground"}
                  >
                    {pickCity || "请选择"}
                  </button>
                )}
                {pickCity && (
                  <button
                    type="button"
                    onClick={() => setRegionTab("district")}
                    className={regionTab === "district" ? "font-semibold text-brand" : "text-muted-foreground"}
                  >
                    请选择
                  </button>
                )}
              </div>

              <div className="no-scrollbar flex-1 overflow-y-auto">
                {regionTab === "province" &&
                  chinaRegions.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setPickProvince(p.name)
                        setPickCity("")
                        setRegionTab("city")
                      }}
                      className={`flex w-full items-center px-4 py-3 text-left text-[14px] active:bg-black/[0.03] ${
                        pickProvince === p.name ? "font-semibold text-brand" : "text-ink"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                {regionTab === "city" &&
                  cityOptions.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setPickCity(c.name)
                        setRegionTab("district")
                      }}
                      className={`flex w-full items-center px-4 py-3 text-left text-[14px] active:bg-black/[0.03] ${
                        pickCity === c.name ? "font-semibold text-brand" : "text-ink"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                {regionTab === "district" &&
                  districtOptions.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setProvince(pickProvince)
                        setCity(pickCity)
                        setDistrict(d)
                        setRegionOpen(false)
                      }}
                      className="flex w-full items-center px-4 py-3 text-left text-[14px] text-ink active:bg-black/[0.03]"
                    >
                      {d}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 确认提交弹层 */}
        {confirmOpen && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setConfirmOpen(false)}>
            <div className="rounded-t-2xl bg-white px-5 pb-5 pt-4" onClick={(e) => e.stopPropagation()}>
              <p className="text-center text-[16px] font-bold text-ink">确认提交该进货订单？</p>
              <p className="mt-2 text-center text-[13px] text-muted-foreground">提交后将进入待入库状态</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 rounded-full border border-black/10 py-2.5 text-[14px] text-ink active:scale-95"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmOpen(false)
                    setSuccess(true)
                    try {
                      window.sessionStorage.removeItem("purchaseCart")
                    } catch {
                      // ignore
                    }
                  }}
                  className="brand-gradient flex-1 rounded-full py-2.5 text-[14px] font-semibold text-white active:scale-95"
                >
                  确认提交
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 提交成功 */}
        {success && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 px-8">
            <div className="w-full rounded-2xl bg-white px-6 py-7 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-[#3fae6f]" strokeWidth={1.6} />
              <p className="mt-3 text-[16px] font-bold text-ink">进货订单已提交</p>
              <p className="mt-1.5 text-[13px] text-muted-foreground">可在进货订单中查看订单状态</p>
              <button
                type="button"
                onClick={() => router.push("/purchase-orders")}
                className="brand-gradient mt-5 w-full rounded-full py-2.5 text-[15px] font-semibold text-white active:scale-95"
              >
                查看订单
              </button>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </PhoneFrame>
  )
}
