'use client'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
// import '@/styles/components/input.scss'
interface InputBoxProps {
  type?: string
  name: string
  value: string
  border?: boolean
  placeholder?: string
  validator?: (text: string) => boolean
  onHandleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  children?: React.ReactElement
  focus?: boolean
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

export default InputBox
