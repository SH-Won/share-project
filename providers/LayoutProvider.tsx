'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const path = pathname.split('/')[1]
  const isMatching = ['', 'detail'].some((el) => el === path)

  console.log(pathname)
  return <>{isMatching && children}</>
}

export default LayoutProvider
