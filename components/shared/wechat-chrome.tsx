"use client"

// 微信小程序统一外壳：状态栏（时间/信号/WiFi/电量）+ 胶囊按钮（••• | ◯）
// 支持 dark（用于品牌红/海报深色背景，白色前景）与 light（白底页面，深色前景）两种配色。

export function StatusBar({ dark = false, time = "10:25" }: { dark?: boolean; time?: string }) {
  const fg = dark ? "text-white" : "text-ink"
  const fill = dark ? "bg-white" : "bg-ink"
  const stroke = dark ? "stroke-white" : "stroke-ink"

  return (
    <div className={`flex h-11 items-center justify-between px-5 text-[15px] font-semibold tabular-nums ${fg}`}>
      <span className="tracking-tight">{time}</span>
      <span className="flex items-center gap-1.5">
        {/* 信号强度 */}
        <span className="flex items-end gap-[2px]" aria-hidden>
          {[3, 5, 7, 9].map((h, i) => (
            <span key={i} className={`w-[3px] rounded-[1px] ${fill}`} style={{ height: h }} />
          ))}
        </span>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className={stroke} aria-hidden>
          <path d="M1 4.2C4.8 1 11.2 1 15 4.2" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M3.4 6.8c2.6-2.1 6.6-2.1 9.2 0" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M5.8 9.3c1.3-1 3.1-1 4.4 0" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.9" className={fill.replace("bg-", "fill-")} stroke="none" />
        </svg>
        {/* 电量 */}
        <span className="flex items-center gap-[2px]" aria-hidden>
          <span className={`relative h-[11px] w-[22px] rounded-[3px] border ${dark ? "border-white/70" : "border-ink/60"}`}>
            <span className={`absolute inset-[1.5px] right-[5px] rounded-[1px] ${fill}`} />
          </span>
          <span className={`h-[4px] w-[1.5px] rounded-r ${fill}`} />
        </span>
      </span>
    </div>
  )
}

export function Capsule({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex h-8 items-center rounded-full border backdrop-blur ${
        dark ? "border-white/40 bg-white/10" : "border-black/10 bg-black/[0.04]"
      }`}
      aria-hidden
    >
      <span className="flex items-center justify-center px-3">
        <span className="flex items-center gap-[3px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-[3px] w-[3px] rounded-full ${dark ? "bg-white" : "bg-ink"}`} />
          ))}
        </span>
      </span>
      <span className={`h-4 w-px ${dark ? "bg-white/40" : "bg-black/15"}`} />
      <span className="flex items-center justify-center px-3">
        <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${dark ? "border-white" : "border-ink"}`}>
          <span className={`h-1 w-1 rounded-full ${dark ? "bg-white" : "bg-ink"}`} />
        </span>
      </span>
    </div>
  )
}
