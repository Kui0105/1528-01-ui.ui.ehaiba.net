'use client'

import { Home, MessageCircle, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useToast } from './toast-provider'

export function TabBar() {
  const toast = useToast()
  const [unread, setUnread] = useState('')

  useEffect(() => {
    const count = parseInt(localStorage.getItem('mjx_msg_unread') || '0', 10)
    setUnread(count > 99 ? '99+' : count > 0 ? String(count) : '')
  }, [])

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 flex h-14 items-center border-t-[0.5px] border-black/[0.08] bg-white/95 backdrop-blur-md"
      data-page-node-id="mt6l7DmKzEqulysqH2k0Tr"
    >
      <div
        onClick={() => toast('当前在积分商城首页')}
        className="flex flex-1 cursor-pointer flex-col items-center gap-0.5 transition-transform active:scale-90"
        data-page-node-id="99CW89qoR2nvYYao8VW4xf"
      >
        <div className="relative text-[#c9302c]" data-page-node-id="Dl1K3WBbZE3cdHLjfZLbip">
          <Home className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <div className="text-[11px] text-[#c9302c]" data-page-node-id="oNLobvOTtwmmLtLii6hlYo">
          首页
        </div>
      </div>

      <div
        onClick={() => {
          location.href = 'message.html'
        }}
        className="flex flex-1 cursor-pointer flex-col items-center gap-0.5 transition-transform active:scale-90"
        data-page-node-id="hav5Kxs1iyMwE7hCgBd4jf"
      >
        <div className="relative text-[#999]" data-page-node-id="spkipSV6eppVL5OcM3zUAX">
          <MessageCircle className="h-5 w-5" strokeWidth={2} />
          <span
            id="msgDot"
            className={`absolute -right-1.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-[7px] border-[1.5px] border-white bg-[#c9302c] px-[3px] text-[9px] text-white ${
              unread ? '' : 'hidden'
            }`}
            data-page-node-id="5WZv0aJSq2FDcsJcAOoCXT"
          >
            {unread}
          </span>
        </div>
        <div className="text-[11px] text-[#999]" data-page-node-id="yyQEQvE5A4e5q9YHbbEPXO">
          消息
        </div>
      </div>

      <div
        onClick={() => {
          location.href = 'profile.html'
        }}
        className="flex flex-1 cursor-pointer flex-col items-center gap-0.5 transition-transform active:scale-90"
        data-page-node-id="qiozKvFXkc3CvSYRfJjHT9"
      >
        <div className="relative text-[#999]" data-page-node-id="wIwWGndkh7YMegynkSz6DO">
          <User className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="text-[11px] text-[#999]" data-page-node-id="msw6Zp7kFQ3kquT30KKGM7">
          我的
        </div>
      </div>
    </div>
  )
}
