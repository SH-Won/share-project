'use client'
import { useBreakPoints } from '@/hooks'
import React from 'react'
import styled from 'styled-components'

interface ResponsiveWindowProps {
  children: React.ReactNode
}

const Container = styled.main``
const ResponsiveWindow = ({ children }: ResponsiveWindowProps) => {
  const { breakPointsClass } = useBreakPoints()
  return <Container className={breakPointsClass ?? ''}>{children}</Container>
}

export default ResponsiveWindow
