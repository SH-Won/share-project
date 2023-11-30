'use client'

import { SessionProvider } from 'next-auth/react'

const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
      refetchInterval={60 * 40}
    >
      {children}
    </SessionProvider>
  )
}

export { NextAuthProvider }
