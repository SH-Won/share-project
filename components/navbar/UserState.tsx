'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useMemo } from 'react'
import Button from '../common/Button'
import UserNavigation from './UserNavigation'

const UserState = () => {
  const { data: session, status } = useSession()
  const isLoginUser = useMemo(() => {
    if (!session || session!.error === 'invalid' || !session!.id) return false
    return true
  }, [session])
  if (status === 'loading')
    return <div className="loading-template loading-animation user-image loading"></div>

  return (
    <div className="navbar__user-state">
      {!isLoginUser ? (
        <Link href="/signup">
          <Button size="medium" type="black" text="Sign up" />
        </Link>
      ) : (
        <UserNavigation
          userId={session!.id}
          userName={session!.name}
          userImageUrl={session!.imageUrl}
        />
      )}
    </div>
  )
}

export default UserState
