'use client'
import React, { useEffect, useState } from 'react'

interface BottomModalProps {
  children: React.ReactNode
  close: () => void
}
const BottomModal = ({ children, close }: BottomModalProps) => {
  const [open, setOpen] = useState<boolean>(true)
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
      <div className={`modal__content--bottom ${!open ? 'close' : 'open'}`}>
        <div className="modal__close-button--bottom" onClick={closeModal}>
          X
        </div>
        {children}
      </div>
    </section>
  )
}
export default BottomModal
