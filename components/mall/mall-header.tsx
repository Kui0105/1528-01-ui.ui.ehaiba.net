import Image from 'next/image'
import { MY_POINTS } from '@/lib/mall-data'

export function MallHeader() {
  return (
    <div
      className="relative flex h-11 flex-shrink-0 items-center bg-transparent"
      data-page-node-id="equrYEPQke1CFFYsmngDYA"
    >
      <div
        className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-white"
        data-page-node-id="uAXZ9Nn9fSFcxitWEEbpuB"
      >
        <div
          className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-[0.5px] border-white/40 bg-white shadow-sm"
          data-page-node-id="oXShXca89fInszQaeiCJnq"
        >
          <Image
            src="/mall/avatar.png"
            alt="用户头像"
            width={28}
            height={28}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="flex flex-col leading-[1.2]"
          data-page-node-id="X2aOMJEv5F8YuoyOLo2dTi"
        >
          <span className="text-[10px] opacity-90" data-page-node-id="Ao2DqEDFdqyQiw6IyqkyHP">
            我的积分
          </span>
          <span
            className="text-[13px] font-semibold tabular-nums"
            id="headerPoints"
            data-page-node-id="PLPF2LI40Nva9GfQaMOCCr"
          >
            {MY_POINTS.toLocaleString()}
          </span>
        </div>
      </div>

      <span
        className="w-full text-center text-base font-medium text-white"
        data-page-node-id="P0gQEqLoPcaKDeX1J958uw"
      >
        积分商城
      </span>

      <span
        className="absolute right-2 top-1/2 flex h-[30px] w-[87px] -translate-y-1/2 items-center rounded-[15px] border-[0.5px] border-white/35 bg-white/15 backdrop-blur-sm"
        data-page-node-id="jePZT2bmh3Pr5wslL3zZeR"
      >
        <span
          className="flex flex-1 items-center justify-center text-[11px] tracking-[-1px] text-white"
          data-page-node-id="Hdg4dSHtoOK2ndDpIvrAoS"
        >
          •••
        </span>
        <span className="h-[18px] w-[0.5px] bg-white/35" data-page-node-id="WlyaX4ezc4fqV7pQbnq89n" />
        <span
          className="flex flex-1 items-center justify-center"
          data-page-node-id="9RTNw1Vllji0VFd4BkX8IF"
        >
          <span
            className="h-[13px] w-[13px] rounded-full border-[1.4px] border-white"
            data-page-node-id="CGdoGYTiksJXz12q37AlTW"
          />
        </span>
      </span>
    </div>
  )
}
