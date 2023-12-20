'use client'
import { useError } from '@/hooks'
import BackEnd from '@/lib/network'
import { IUserProfile } from '@/lib/network/types/user'
import { RootState } from '@/store'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../common/Button'
import ErrorNotification from '../error/ErrorNotification'
import UserImage from './UserImage'

const ProfileSkeleton = () => {
  return (
    <div className="profile-container skeleton">
      <div className="image loading-template loading-animation"></div>
      <div className="profile">
        <div className="bar loading-template loading-animation"></div>
        <div className="bar-button loading-template loading-animation"></div>
      </div>
    </div>
  )
}

interface Props {
  session: Session | null
}
const UserProfile = ({ session }: Props) => {
  // const { status, data: session } = useSession()
  // const { loading, name, imageUrl } = useSelector((state: RootState) => state.user)
  // const pathname = usePathname()
  // const userId = pathname.split('/')[1]
  // const isSessionUser = status === 'authenticated' && session.id === userId
  // console.log('loading', loading, 'status', status)
  // if (status === 'loading') return <ProfileSkeleton />
  return (
    <div className="profile-container">
      <UserImage imageUrl={session?.imageUrl} size={80} />
      <div className="profile">
        <span className="profile__name">{session?.name || '비회원 유저'}</span>
        <Link href="/profile">
          <Button type="basic" size="medium" text="프로필 수정" />
        </Link>
      </div>
    </div>
  )
}
export const AnotherUserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<IUserProfile>({} as IUserProfile)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    BackEnd.getInstance()
      .user.getUserProfile({ userId })
      .then((response) => {
        setUser(response.user)
      })
      .catch((e) => setError(true))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <ProfileSkeleton />
  if (error) return <ErrorNotification onClick={() => {}} />
  return (
    <div className="profile-container">
      <UserImage imageUrl={user?.imageUrl} size={80} />
      <div className="profile">
        <span className="profile__name">{user?.name || '비회원 유저'}</span>
      </div>
    </div>
  )
}

export default UserProfile
