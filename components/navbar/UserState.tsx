'use client'
import { useSession } from 'next-auth/react'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { useMemo } from 'react'
import Button from '../common/Button'
import UserImage from '../user/UserImage'

const UserState = () => {
  // const session = await getServerSession(authOptions)
  const { data: session, status } = useSession()
  const isLoginUser = useMemo(() => {
    if (!session || session!.error === 'invalid' || !session!.id) return false
    return true
  }, [session])

  if (status === 'loading')
    return (
      <div className="loading-user-container">
        <div className="loading-template loading-animation user-image"></div>
      </div>
    )

  // const isLoginUser = !session || session!.error === 'invalid' || !session!.id ? false : true

  return (
    <div className="navbar__user-state">
      {!isLoginUser ? (
        <Link href="/signup">
          <Button size="medium" type="black" text="Sign up" />
        </Link>
      ) : (
        <>
          <Link href="/user/profile">
            <UserImage size={28} />
          </Link>
          <span>{session!.name}</span>
        </>
      )}
    </div>
  )
}

export default UserState
