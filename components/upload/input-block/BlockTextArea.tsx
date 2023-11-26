import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react'
import BlockController from '../BlockController'
interface InputBoxProps {
  type?: string
  name: string
  value: string
  border?: boolean
  placeholder?: string
  validator?: (text: string) => boolean
  onHandleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  focus?: boolean
}
const BlockTextArea = ({
  type,
  name,
  value,
  placeholder,
  validator,
  onHandleChange,
  focus,
}: InputBoxProps) => {
  const container = useRef<HTMLTextAreaElement>(null)
  // const [focus, setFocus] = useState(false)
  const valid = validator?.(value)
  const computedClass = useMemo(() => {
    let className = 'textarea'
    if (focus) className += ' focus'
    if (typeof validator === 'function' && !valid) className += ' error'
    return className
  }, [focus, valid])
  const computedHeight = () => {
    container.current!.style.height = '1px'
    container.current!.style.height = container.current!.scrollHeight + 12 + 'px'
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

  return (
    <>
      <textarea
        ref={container}
        onKeyUp={throttle(computedHeight, 400)}
        name={name}
        id={name}
        className={computedClass}
        placeholder={placeholder}
        onChange={onHandleChange}
        value={value || ''}
      />
      {focus && <BlockController name={name} />}
    </>
  )
}

export default BlockTextArea
