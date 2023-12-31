'use client'
import { useRouter } from 'next/navigation'
import React, { cloneElement, useEffect, useState } from 'react'
import Close from './Close'
import ModalHeader from './ModalHeader'

interface BottomModalProps {
  children: React.ReactElement[] | React.ReactElement
  close?: () => void
}
// const BottomSheetModal = ({ children }: BottomModalProps) => {
//   const [open, setOpen] = useState<boolean>(true)
//   const router = useRouter()
//   const closeModal = () => {
//     setOpen(false)
//     setTimeout(() => {
//       router.back()
//     }, 300)
//   }
//   useEffect(() => {
//     document.body.style.overflow = 'hidden'
//     setOpen(true)
//     return () => {
//       document.body.style.removeProperty('overflow')
//     }
//   }, [])
//   return (
//     <React.Fragment>
//       <div className={`modal__container--bottom ${!open ? 'close' : 'open'}`}>
//         <Close />
//         {cloneElement(children, { close: closeModal })}
//       </div>
//     </React.Fragment>
//   )
// }

const BottomSheetModal = ({ children }: BottomModalProps) => {
  return <div className="modal__container--bottom-sheet">{children}</div>
}
export default BottomSheetModal
