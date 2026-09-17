'use client'

import { useEffect, useState } from 'react'
import { Home, MessageCircle, User } from 'lucide-react'
import { showToast } from './toast'

export function TabBar() {
  const [unread, setUnread] = useState('')

  useEffect(() => {
    // 未读消息角标（保持原型逻辑：读取 localStorage）
    const count = parseInt(localStorage.getItem('mjx_msg_unread') || '0', 10)
    setUnread(count > 99 ? '99+' : count > 0 ? String(count) : '')
  }, [])

  return (
    <div
      data-page-node-id="mt6l7DmKzEqulysqH2k0Tr"
      className="absolute bottom-0 left-0 right-0 z-20 flex h-14 items-center border-t border-black/5 bg-white/95 backdrop-blur-md"
    >
      {/* 首页 */}
      <button
        onClick={() => showToast('当前在积分商城首页')}
        data-page-node-id="99CW89qoR2nvYYao8VW4xf"
        className="flex flex-1 flex-col items-center gap-0.5"
      >
        <span data-page-node-id="Dl1K3WBbZE3cdHLjfZLbip" className="relative">
          <Home className="h-[22px] w-[22px] text-brand" strokeWidth={2.2} fill="currentColor" fillOpacity={0.15} />
        </span>
        <span data-page-node-id="oNLobvOTtwmmLtLii6hlYo" className="text-[11px] font-medium text-brand">
          首页
        </span>
      </button>

      {/* 消息 */}
      <a href="message.html" data-page-node-id="hav5Kxs1iyMwE7hCgBd4jf" className="group flex flex-1 flex-col items-center gap-0.5">
        <span data-page-node-id="spkipSV6eppVL5OcM3zUAX" className="relative">
          <MessageCircle className="h-[22px] w-[22px] text-ink-soft transition-colors group-hover:text-brand" strokeWidth={2} />
          <span
            id="msgDot"
            data-page-node-id="5WZv0aJSq2FDcsJcAOoCXT"
            className="absolute -right-1.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full border-[1.5px] border-white bg-brand px-[3px] text-[9px] leading-none text-white data-[empty=true]:hidden"
            data-empty={unread === ''}
          >
            {unread}
          </span>
        </span>
        <span data-page-node-id="yyQEQvE5A4e5q9YHbbEPXO" className="text-[11px] text-ink-soft transition-colors group-hover:text-brand">
          消息
        </span>
      </a>

      {/* 我的 */}
      <a href="profile.html" data-page-node-id="qiozKvFXkc3CvSYRfJjHT9" className="group flex flex-1 flex-col items-center gap-0.5">
        <span data-page-node-id="wIwWGndkh7YMegynkSz6DO" className="relative">
          <User className="h-[22px] w-[22px] text-ink-soft transition-colors group-hover:text-brand" strokeWidth={2} />
        </span>
        <span data-page-node-id="msw6Zp7kFQ3kquT30KKGM7" className="text-[11px] text-ink-soft transition-colors group-hover:text-brand">
          我的
        </span>
      </a>
    </div>
  )
}
