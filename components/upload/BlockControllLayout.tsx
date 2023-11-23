'use client'
import React, { useRef, useState } from 'react'

interface Props {
  children: React.ReactElement | React.ReactElement[]
  currentIndex?: number
}
const BlockControllLayout = ({ children }: Props) => {
  const [focus, setFocus] = useState(false)
  const computedClass = () => {
    let className = ''
    if (focus) className += ' focus'
    return className
  }

  return (
    <div
      className={`block-layout ${computedClass()}`}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <div className="icon-controller"></div>
      {children}
    </div>
  )
}

export default BlockControllLayout
