import { Signal, Wifi } from 'lucide-react'

export function StatusBar() {
  return (
    <div
      className="flex h-7 flex-shrink-0 items-center justify-between bg-transparent px-3.5 text-[13px] font-medium text-white"
      data-page-node-id="SJAEhv71llgm0iM22uPbl0"
    >
      <span data-page-node-id="1yPUs9SiEwvcmQMir4CqWY">10:25</span>
      <span
        className="flex items-center gap-1.5 text-xs"
        data-page-node-id="asCBUnmKZFFSqckrwqC35B"
      >
        <Signal className="h-3.5 w-3.5" strokeWidth={2.2} />
        <Wifi className="h-3.5 w-3.5" strokeWidth={2.2} />
        <span
          className="relative inline-block h-[11px] w-[22px] rounded-[2px] border border-white after:absolute after:-right-[3px] after:top-[3px] after:h-[5px] after:w-[2px] after:rounded-[1px] after:bg-white after:content-['']"
          data-page-node-id="PlpLkjoKGzu1zCNbcLNLW3"
        >
          <span className="absolute inset-y-[1px] left-[1px] w-[14px] rounded-[1px] bg-white" />
        </span>
      </span>
    </div>
  )
}
