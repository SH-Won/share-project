'use client'

import { SessionProvider } from 'next-auth/react'

const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider refetchWhenOffline={false} refetchInterval={60 * 20}>
      {children}
    </SessionProvider>
  )
}

export { NextAuthProvider }
