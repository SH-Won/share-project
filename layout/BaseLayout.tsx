'use client'
import Navbar from '@/components/navbar/Navbar'
import Toast from '@/components/toast/Toast'
import { usePathname } from 'next/navigation'
import React from 'react'

interface BaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const pathname = usePathname()
  const isHeader = !['signup', 'signin', 'upload'].includes(pathname.split('/')[1])
  console.log('base layout render')
  return (
    <>
      {isHeader && <Navbar />}
      <main>
        {children}
        <Toast />
      </main>
    </>
  )
}

export default BaseLayout
