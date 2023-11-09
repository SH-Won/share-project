'use client'

import { useCallback, useRef } from 'react'

interface Props {
  callback: (() => void) | ((arg: any) => void)
}
const useInterSection = <T extends HTMLElement>({ callback }: Props) => {
  const observer = useRef<IntersectionObserver>()
  const handleInterSecting: IntersectionObserverCallback = ([entry], ob) => {
    if (entry.isIntersecting) {
      callback(false)
    } else {
      callback(true)
    }
  }
  const targetRef = useCallback((node: T) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(handleInterSecting, {
      threshold: 1,
    })
    if (node) observer.current?.observe(node)
  }, [])

  return {
    targetRef,
  }
}
export { useInterSection }
