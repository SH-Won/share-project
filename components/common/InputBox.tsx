'use client'
import React, { ChangeEvent, useLayoutEffect, useRef, useState } from 'react'
import '@/styles/components/input.scss'
interface InputBoxProps {
  type?: string
  name: string
  value: string
  placeholder?: string
  validator?: (text: string) => boolean
  onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputBox = ({
  type,
  name,
  value,
  placeholder,
  validator,
  onHandleChange,
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
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        className={computedClass()}
        placeholder={placeholder}
        onChange={onHandleChange}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}

export default InputBox
