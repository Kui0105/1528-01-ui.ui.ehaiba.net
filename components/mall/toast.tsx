'use client'

import { useEffect, useRef, useState } from 'react'

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent('mall-toast', { detail: message }))
}

export function Toast() {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      setMsg(detail)
      setShow(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setShow(false), 1600)
    }
    window.addEventListener('mall-toast', handler)
    return () => window.removeEventListener('mall-toast', handler)
  }, [])

  if (!show) return null

  return (
    <div
      id="toast"
      className="pointer-events-none absolute left-1/2 top-1/2 z-[200] max-w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black/80 px-5 py-3 text-center text-[13px] text-white shadow-lg backdrop-blur-sm [animation:mall-toast-in_0.2s_ease]"
    >
      {msg}
    </div>
  )
}
