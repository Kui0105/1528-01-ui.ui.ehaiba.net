import { ScanLine } from 'lucide-react'

export function ScanFab() {
  return (
    <a
      href="index.html?from=mall"
      data-page-node-id="dMJzZHwokHBU7DkHQm3dAk"
      aria-label="扫码"
      className="absolute bottom-[72px] right-4 z-30 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-brand-gradient text-white shadow-fab transition-transform duration-200 [animation:mall-float_3s_ease-in-out_infinite] hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
      <ScanLine className="h-6 w-6" strokeWidth={2} />
    </a>
  )
}
