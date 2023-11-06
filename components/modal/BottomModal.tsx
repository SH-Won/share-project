'use client'
import { useRouter } from 'next/navigation'
import React, { cloneElement, useEffect, useState } from 'react'

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
      // router.back()
      // router.refresh()
      console.log('done')
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
        {cloneElement(children, { close: closeModal })}
      </div>
    </section>
  )
}
export default BottomModal
