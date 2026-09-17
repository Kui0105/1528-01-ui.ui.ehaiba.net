import Image from 'next/image'
import { goods } from '@/lib/mall-data'

export function RecommendGrid() {
  return (
    <div data-page-node-id="ElTuEErrPpeF0GN7UBXesf" className="mx-3">
      <div data-page-node-id="KVFZcFt59fAyVElBAvPr9Z" className="mb-2.5 flex items-center gap-2">
        <span className="h-4 w-1 rounded-full bg-gold-gradient" />
        <h2 className="text-[15px] font-semibold text-ink">推荐兑换</h2>
        <span className="text-[11px] text-ink-soft">精选好物 · 积分优享</span>
      </div>

      <div id="recGrid" data-page-node-id="4kRZMdr8hu2MswVsbA97YX" className="grid grid-cols-2 gap-2.5">
        {goods.map((g, i) => (
          <a
            key={i}
            href={`goods-detail.html?id=${i}`}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-black/5 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            style={{ animation: `mall-fade-up 0.4s ease both`, animationDelay: `${i * 45}ms` }}
          >
            <div className="relative aspect-square overflow-hidden bg-paper">
              <Image
                src={g.image || '/placeholder.svg'}
                alt={g.name}
                fill
                sizes="200px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-medium text-brand backdrop-blur-sm">
                已兑 {g.ex}
              </span>
            </div>
            <div className="p-2.5">
              <div className="mb-1.5 truncate text-[13px] font-medium text-ink">{g.name}</div>
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-bold text-brand">
                  {g.points}
                  <span className="ml-0.5 text-[10px] font-normal">积分</span>
                </span>
                <span className="text-[10px] text-ink-soft line-through">{g.orig}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
