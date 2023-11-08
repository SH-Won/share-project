'use client'
import { useRouter } from 'next/navigation'
import React, { cloneElement, useEffect, useState } from 'react'
import Close from './Close'

interface BottomModalProps {
  children: React.ReactElement
  close: () => void
}
const BottomModal = ({ children, close }: BottomModalProps) => {
  const [open, setOpen] = useState<boolean>(true)
  const router = useRouter()
  const closeModal = () => {
    setOpen(false)
    setTimeout(() => {
      close()
    }, 300)
  }
  useEffect(() => {
    setOpen(true)
  }, [])
  return (
    <section className="modal">
      <Close />
      <div className={`modal__content--bottom ${!open ? 'close' : 'open'}`}>
        {cloneElement(children, { close: closeModal })}
      </div>
    </section>
  )
}
export default BottomModal
