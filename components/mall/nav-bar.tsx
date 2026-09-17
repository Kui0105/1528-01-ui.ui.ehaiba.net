import Image from 'next/image'
import { myPoints } from '@/lib/mall-data'

export function NavBar() {
  return (
    <div
      data-page-node-id="equrYEPQke1CFFYsmngDYA"
      className="relative flex h-12 flex-shrink-0 items-center"
    >
      {/* 我的积分 */}
      <div
        data-page-node-id="uAXZ9Nn9fSFcxitWEEbpuB"
        className="absolute left-3 flex items-center gap-2"
      >
        <div
          data-page-node-id="oXShXca89fInszQaeiCJnq"
          className="h-8 w-8 overflow-hidden rounded-full bg-white/95 ring-2 ring-white/40"
        >
          <Image src="/mall/avatar.png" alt="用户头像" width={40} height={40} className="h-full w-full object-cover" />
        </div>
        <div data-page-node-id="X2aOMJEv5F8YuoyOLo2dTi" className="flex flex-col leading-tight text-white">
          <span data-page-node-id="Ao2DqEDFdqyQiw6IyqkyHP" className="text-[10px] opacity-90">
            我的积分
          </span>
          <span
            id="headerPoints"
            data-page-node-id="PLPF2LI40Nva9GfQaMOCCr"
            className="text-[15px] font-bold tabular-nums text-gold-light"
          >
            {myPoints.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 标题 */}
      <span
        data-page-node-id="P0gQEqLoPcaKDeX1J958uw"
        className="w-full text-center text-base font-semibold tracking-wide text-white"
      >
        积分商城
      </span>

      {/* 小程序胶囊 */}
      <span
        data-page-node-id="jePZT2bmh3Pr5wslL3zZeR"
        className="absolute right-2 flex h-[30px] w-[87px] items-center rounded-full border-[0.5px] border-white/35 bg-white/15 backdrop-blur-sm"
      >
        <span data-page-node-id="Hdg4dSHtoOK2ndDpIvrAoS" className="flex flex-1 items-center justify-center text-[11px] tracking-tighter text-white">
          •••
        </span>
        <span data-page-node-id="WlyaX4ezc4fqV7pQbnq89n" className="h-[18px] w-px bg-white/35" />
        <span data-page-node-id="9RTNw1Vllji0VFd4BkX8IF" className="flex flex-1 items-center justify-center">
          <span data-page-node-id="CGdoGYTiksJXz12q37AlTW" className="h-[13px] w-[13px] rounded-full border-[1.4px] border-white" />
        </span>
      </span>
    </div>
  )
}
