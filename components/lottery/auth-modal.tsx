"use client"

export function AuthModal({
  open,
  onAuth,
  onClose,
}: {
  open: boolean
  onAuth: () => void
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center">
      <div className="w-full rounded-t-3xl bg-white p-6 text-center text-ink sm:m-4 sm:rounded-3xl">
        <h3 className="text-lg font-bold">需要登录</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          检测到您尚未登录，请授权微信手机号后继续抽奖
        </p>
        <button
          type="button"
          onClick={onAuth}
          className="brand-gradient glow-brand mt-5 w-full rounded-full py-3.5 text-base font-semibold text-white"
        >
          微信手机号一键登录
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-full py-3 text-sm text-muted-foreground"
        >
          暂不登录
        </button>
      </div>
    </div>
  )
}
