'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'

type ToastContextValue = (message: string) => void

const ToastContext = createContext<ToastContextValue>(() => {})

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toast = useCallback((m: string) => {
    setMessage(m)
    setShow(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setShow(false), 1600)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        id="toast"
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute left-1/2 top-1/2 z-[200] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black/80 px-[22px] py-3 text-[13px] text-white shadow-lg backdrop-blur-sm transition-all duration-200 ${
          show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  )
}
