'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
type CloseProps = {
  closeFunc?: () => void
}
const isInterCeptingRoute = () => {
  return document.querySelector('main')?.querySelector('.modal') ? true : false
}
const Close = ({ closeFunc }: CloseProps) => {
  const router = useRouter()
  if (!isInterCeptingRoute()) return null
  const onClose = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof closeFunc === 'function') {
      closeFunc()
      return
    }
    router.back()
  }
  return (
    <Link href="#" className="close-button">
      <Image onClick={onClose} src="/close.svg" alt="close" width={24} height={24} />
    </Link>
  )
}

export default Close
