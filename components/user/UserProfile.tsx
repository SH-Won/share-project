'use client'
import { RootState } from '@/store'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Button from '../common/Button'
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

const UserProfile = () => {
  const { status } = useSession()
  const { loading, name, imageUrl } = useSelector((state: RootState) => state.user)
  const goEditPage = () => {
    //
  }
  if (loading || status === 'loading') return <ProfileSkeleton />
  return (
    <div className="profile-container">
      <UserImage imageUrl={imageUrl} size={80} />
      <div className="profile">
        <span className="profile__name">{name}</span>
        <Link href="/profile">
          <Button type="basic" size="medium" text="프로필 수정" />
        </Link>
      </div>
    </div>
  )
}

export default UserProfile
