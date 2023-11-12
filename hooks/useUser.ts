'use client'

import { useSession } from 'next-auth/react'

const useUser = () => {
  const { data: session, update } = useSession()

  // const
}
export { useUser }
