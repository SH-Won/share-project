'use client'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import '@/styles/components/input.scss'
interface InputBoxProps {
  type?: string
  name: string
  value: string
  placeholder?: string
  validator?: (text: string) => boolean
  onHandleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  children?: React.ReactElement
}

const InputBoxLabel = ({ name }: Pick<InputBoxProps, 'name'>) => {
  return <label htmlFor={name}>{name}</label>
}
const InputBox = ({
  type,
  name,
  value,
  placeholder,
  validator,
  onHandleChange,
  children,
}: InputBoxProps) => {
  const [focus, setFocus] = useState(false)
  const valid = validator?.(value)
  const computedClass = () => {
    let className = 'input'
    if (focus || value) className += ' focus'
    if (typeof validator === 'function' && !valid) className += ' error'
    return className
  }

  return (
    <div className="input-container">
      {children}
      <input
        type={type || 'text'}
        name={name}
        className={computedClass()}
        placeholder={placeholder}
        onChange={onHandleChange}
        value={value || ''}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}
InputBox.Label = InputBoxLabel

export const TextAreaBox = ({
  type,
  name,
  value,
  placeholder,
  validator,
  onHandleChange,
  children,
}: InputBoxProps) => {
  const container = useRef<HTMLTextAreaElement>(null)
  const [focus, setFocus] = useState(false)
  const valid = validator?.(value)
  const computedClass = () => {
    let className = 'textarea'
    if (focus || value) className += ' focus'
    if (typeof validator === 'function' && !valid) className += ' error'
    return className
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
  const computedHeight = () => {
    container.current!.style.height = '1px'
    container.current!.style.height = container.current!.scrollHeight + 12 + 'px'
  }

  return (
    <div className="input-container">
      {children}
      <textarea
        ref={container}
        onKeyUp={throttle(computedHeight, 400)}
        name={name}
        className={computedClass()}
        placeholder={placeholder}
        onChange={onHandleChange}
        value={value || ''}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}

export default InputBox
