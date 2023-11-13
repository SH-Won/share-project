'use client'
import { useRouter } from 'next/navigation'
import React, { cloneElement, useEffect, useState } from 'react'
import Close from './Close'

interface BottomModalProps {
  children: React.ReactElement
  close?: () => void
}
const BottomModal = ({ children, close }: BottomModalProps) => {
  const [open, setOpen] = useState<boolean>(true)
  const router = useRouter()
  const closeModal = () => {
    setOpen(false)
    setTimeout(() => {
      router.back()
    }, 300)
  }
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    setOpen(true)
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [])
  return (
    <React.Fragment>
      <div className={`modal__content--bottom ${!open ? 'close' : 'open'}`}>
        <Close />
        {cloneElement(children, { close: closeModal })}
      </div>
    </React.Fragment>
  )
}
export default BottomModal
