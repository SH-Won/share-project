'use client'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { setTimeout } from 'timers'

export type TScreenState = 'mobile' | 'tablet' | 'desktop' | ''
const useBreakPoints = () => {
  const [currentClass, setCurrentClass] = useState<TScreenState>('')
  const [breakPoints, setBreakPoints] = useState<number>(0)
  const defaultBreakPoinsts = {
    mobile: 600,
    tablet: 900,
    desktop: 1100,
  }
  const throttle = useCallback((func: () => void, time: number) => {
    let timer: ReturnType<typeof setTimeout>
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func()
      }, time)
    }
  }, [])
  const resize = useCallback(() => {
    if (window.innerWidth < defaultBreakPoinsts['mobile']) {
      setCurrentClass('mobile')
    } else if (
      window.innerWidth >= defaultBreakPoinsts['mobile'] &&
      window.innerWidth < defaultBreakPoinsts['tablet']
    ) {
      setCurrentClass('tablet')
    } else {
      setCurrentClass('desktop')
    }
    setBreakPoints(window.innerWidth)
  }, [])

  useLayoutEffect(() => {
    const windowResize = throttle(resize, 200)
    window.addEventListener('resize', windowResize)
    resize()
    return () => {
      window.removeEventListener('resize', windowResize)
    }
  }, [])
  const breakPointsClass = useMemo(() => {
    return currentClass
  }, [currentClass])

  return {
    breakPointsClass,
  }
}

export { useBreakPoints }
