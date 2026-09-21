"use client"

export const timeOptions = ["全部", "今日", "昨日", "本周", "本月"] as const
export type TimeOption = (typeof timeOptions)[number]

export function TimeFilterSheet({
  open,
  value,
  onSelect,
  onClose,
}: {
  open: boolean
  value: TimeOption
  onSelect: (v: TimeOption) => void
  onClose: () => void
}) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={onClose}>
      <div className="rounded-t-2xl bg-white pb-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
          <span className="text-[15px] font-semibold text-ink">选择时间</span>
          <button type="button" onClick={onClose} className="text-[13px] text-muted-foreground" aria-label="关闭">
            取消
          </button>
        </div>
        <div>
          {timeOptions.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                onSelect(t)
                onClose()
              }}
              className={`flex w-full items-center px-4 py-3 text-left text-[14px] active:bg-black/[0.03] ${
                value === t ? "font-semibold text-brand" : "text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
