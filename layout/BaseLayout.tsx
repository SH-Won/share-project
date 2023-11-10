'use client'
import Navbar from '@/components/Navbar'
import { usePathname } from 'next/navigation'
import React from 'react'

interface BaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const pathname = usePathname()
  const isHeader = pathname.split('/')[1] !== 'signup'
  return (
    <>
      {isHeader && <Navbar />}
      <main>{children}</main>
    </>
  )
}

export default BaseLayout
