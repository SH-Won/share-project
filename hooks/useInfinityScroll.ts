import { useCallback, useRef } from 'react'

type Props = {
  loading: boolean
  hasMore: boolean
  callback: () => void
}
const useInfinityScroll = <T extends HTMLElement>({ loading, hasMore, callback }: Props) => {
  const observer = useRef<IntersectionObserver>()
  const handleInterSecting: IntersectionObserverCallback = ([entry], ob) => {
    if (entry.isIntersecting && !loading) {
      console.log('target')
      callback()
      ob.unobserve(entry.target)
    }
  }
  const targetRef = useCallback(
    (node: T) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(handleInterSecting, {
        threshold: 0.8,
      })
      if (node) observer.current?.observe(node)
    },
    [loading]
  )

  return {
    targetRef,
  }
}

export { useInfinityScroll }
