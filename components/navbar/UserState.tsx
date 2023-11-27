'use client'
import { RootState } from '@/store'
import { useSession } from 'next-auth/react'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../common/Button'
import UserImage from '../user/UserImage'
import UserNavigation from './UserNavigation'

const UserState = () => {
  const { data: session, status } = useSession()
  const { imageUrl, loading } = useSelector((state: RootState) => state.user)
  const isLoginUser = useMemo(() => {
    if (!session || session!.error === 'invalid' || !session!.id) return false
    return true
  }, [session])

  if (status === 'loading' || loading)
    return <div className="loading-template loading-animation user-image loading"></div>
  return (
    <div className="navbar__user-state">
      {!isLoginUser ? (
        <Link href="/signup">
          <Button size="medium" type="black" text="Sign up" />
        </Link>
      ) : (
        <>
          <UserNavigation userName={session!.name} userImageUrl={imageUrl} />
        </>
      )}
    </div>
  )
}

export default UserState
