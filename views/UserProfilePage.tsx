'use client'
import InputFileBox from '@/components/common/InputFileBox'
import UserImage from '@/components/user/UserImage'
import UserProfileSkeleton from '@/components/user/UserProfileSkeleton'
import { useForm } from '@/hooks'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const initialState = {
  image: '',
}
const UserProfilePage = () => {
  const { data: session, status } = useSession()
  const { inputValue, onHandleChangeImage } = useForm<typeof initialState>(initialState)
  if (status === 'loading') return <UserProfileSkeleton />
  return (
    <div className="profile-container">
      <div className="profile__heading">
        <InputFileBox name="image" onHandleChange={onHandleChangeImage} value={inputValue.image}>
          <InputFileBox.UserImageUploader imageUrl="/noImage.svg" />
        </InputFileBox>
        <div className="profile-info">
          <span className="user-name">{session!.name}</span>
          <span className="user-job">{session!.id}</span>
        </div>
      </div>

      <div className="profile__overview">
        <div className="user-asset">
          <span className="title">이메일</span>
          <span className="description">{session!.email}</span>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
