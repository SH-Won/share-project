'use client'
import Toast from '@/components/toast/Toast'
import { usePathname } from 'next/navigation'
import React from 'react'

interface BaseLayoutProps {
  children: React.ReactNode[]
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const pathname = usePathname()
  const isHeader = !['signup', 'signin', 'upload'].includes(pathname.split('/')[1])
  return (
    <>
      {isHeader && children![0]}
      <main>
        {children[1]}
        <Toast />
      </main>
    </>
  )
}

export default BaseLayout
