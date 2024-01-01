'use client'
import { Colors } from 'my-react-component'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
type CloseProps = {
  closeFunc?: () => void
}

export const CloseSVG = ({ color, size }: { color?: string; size?: number }) => {
  const iconSize = size || 24
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width={iconSize}
      height={iconSize}
      fill="none"
      role="img"
      className="icon fill-current"
    >
      <path
        d="M8.28596 6.51819C7.7978 6.03003 7.00634 6.03003 6.51819 6.51819C6.03003 7.00634 6.03003 7.7978 6.51819 8.28596L11.2322 13L6.51819 17.714C6.03003 18.2022 6.03003 18.9937 6.51819 19.4818C7.00634 19.97 7.7978 19.97 8.28596 19.4818L13 14.7678L17.714 19.4818C18.2022 19.97 18.9937 19.97 19.4818 19.4818C19.97 18.9937 19.97 18.2022 19.4818 17.714L14.7678 13L19.4818 8.28596C19.97 7.7978 19.97 7.00634 19.4818 6.51819C18.9937 6.03003 18.2022 6.03003 17.714 6.51819L13 11.2322L8.28596 6.51819Z"
        fill={color || 'currentColor'}
      ></path>
    </svg>
  )
}

// next build 할때 document 같은 브라우저 API는 무조건 client 환경이 확보 됐을때 참조 해야
// 에러가 나지 않음
const Close = ({ closeFunc }: CloseProps) => {
  const router = useRouter()
  const onClose = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof closeFunc === 'function') {
      closeFunc()
      return
    }
    router.back()
  }
  return (
    <div className="close-button" onClick={onClose}>
      {/* <Image onClick={onClose} src="/close.svg" alt="close" width={24} height={24} /> */}
      <CloseSVG />
    </div>
  )
}

export default Close
