'use client'

export function ScanFab() {
  return (
    <button
      type="button"
      aria-label="扫一扫"
      onClick={() => {
        location.href = 'index.html?from=mall'
      }}
      className="absolute bottom-[72px] right-4 z-30 flex h-[52px] w-[52px] items-center justify-center rounded-full border-[0.5px] border-black/[0.08] bg-[#c9302c] text-white shadow-lg shadow-[#c9302c]/30 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
      data-page-node-id="dMJzZHwokHBU7DkHQm3dAk"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[26px] w-[26px]"
        data-page-node-id="Az44sNkDnGrEuzwsWvBuPN"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" data-page-node-id="y1EZDWnwVZkXE9ynLDp0bK" />
        <path d="M7 7h3v3H7z" data-page-node-id="no2ps9XvxFZSs0QONSpomv" />
        <path d="M14 7h3v3h-3z" data-page-node-id="YZOKprGTDKFHFcnH7W6ycR" />
        <path d="M7 14h3v3H7z" data-page-node-id="eDE0qufyfANqSvwGIuSUkN" />
        <path d="M3 12h18" data-page-node-id="H6LCTNFzIi4UOOGZpFsFxg" />
      </svg>
    </button>
  )
}
