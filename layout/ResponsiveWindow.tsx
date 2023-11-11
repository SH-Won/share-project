'use client'
import { useBreakPoints } from '@/hooks'
import React from 'react'

interface ResponsiveWindowProps {
  children: React.ReactNode
}

const ResponsiveWindow = ({ children }: ResponsiveWindowProps) => {
  const { breakPointsClass } = useBreakPoints()
  return <main className={breakPointsClass ?? ''}>{children}</main>
}

export default ResponsiveWindow
