'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
type CloseProps = {
  closeFunc?: () => void
}

// next build 할때 document 같은 브라우저 API는 무조건 client 환경이 확보 됐을때 참조 해야
// 에러가 나지 않음
const Close = ({ closeFunc }: CloseProps) => {
  const [isShow, setIsShow] = useState(false)
  // const isInterCeptingRoute = () => {
  //   return document.querySelector('main')?.querySelector('.detail-layout') ? true : false
  // }
  const router = useRouter()
  const onClose = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof closeFunc === 'function') {
      closeFunc()
      return
    }
    router.back()
  }
  useEffect(() => {
    const isInterCeptingRoute = () => {
      return document.querySelector('main')?.querySelector('.detail-layout') ? true : false
    }
    if (isInterCeptingRoute()) setIsShow(true)
  }, [])
  return (
    <>
      {isShow ? (
        <Link href="#" className="close-button">
          <Image onClick={onClose} src="/close.svg" alt="close" width={24} height={24} />
        </Link>
      ) : null}
    </>
  )
}

export default Close
