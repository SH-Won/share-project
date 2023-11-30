'use client'
import { useLayoutEffect, useRef } from 'react'
interface ICloseEventProps {
  callback: () => void
}
const useCloseEvent = <T extends HTMLElement>({ callback }: ICloseEventProps) => {
  const container = useRef<T>(null)

  useLayoutEffect(() => {
    if (!container.current) return
    const handleClose = (e: MouseEvent) => {
      const element = e.target
      if (element instanceof HTMLElement) {
        if (element === container.current || !container.current?.contains(element)) callback()
      }
    }
    container.current.addEventListener('click', handleClose)
    return () => {
      if (container.current instanceof HTMLElement) {
        container.current.removeEventListener('click', handleClose)
      }
    }
  }, [container.current])
  return {
    container,
  }
}

export { useCloseEvent }
