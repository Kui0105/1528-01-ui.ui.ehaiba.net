import { Signal, Wifi, BatteryFull } from 'lucide-react'

export function StatusBar() {
  return (
    <div
      data-page-node-id="SJAEhv71llgm0iM22uPbl0"
      className="relative flex h-7 flex-shrink-0 items-center justify-between px-4 text-[13px] font-semibold text-white"
    >
      <span data-page-node-id="1yPUs9SiEwvcmQMir4CqWY" className="tracking-tight tabular-nums">
        10:25
      </span>
      <span className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" strokeWidth={2.4} />
        <Wifi className="h-3.5 w-3.5" strokeWidth={2.4} />
        <BatteryFull className="h-4 w-4" strokeWidth={2} />
      </span>
    </div>
  )
}
