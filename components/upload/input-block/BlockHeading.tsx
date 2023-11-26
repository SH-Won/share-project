'use client'
import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react'
import BlockController from '../BlockController'
// import '@/styles/components/input.scss'
interface InputBoxProps {
  title?: boolean
  name: string
  value: string
  placeholder?: string
  validator?: (text: string) => boolean
  onHandleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  focus?: boolean
}
const BlockHeading = ({
  name,
  value,
  placeholder,
  validator,
  onHandleChange,
  focus,
  title,
}: InputBoxProps) => {
  const valid = validator?.(value)
  const computedClass = useMemo(() => {
    let className = 'input upload'
    if (focus) className += ' focus'
    if (typeof validator === 'function' && !valid) className += ' error'
    return className
  }, [focus, valid])

  return (
    <>
      <input
        type="text"
        name={name}
        className={computedClass}
        placeholder={placeholder}
        onChange={onHandleChange}
        value={value || ''}
      />
      {focus && <BlockController name={name} />}
    </>
  )
}

export default BlockHeading
