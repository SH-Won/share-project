'use client'
import Button from '@/components/common/Button'
import InputFileBox from '@/components/common/InputFileBox'

import UserProfileSkeleton from '@/components/user/UserProfileSkeleton'
import { useForm } from '@/hooks'
import { AppDispatch, RootState } from '@/store'
import { updateUserImage } from '@/store/user/userSlice'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  image: '',
}
const UserProfilePage = () => {
  const { data: session, status } = useSession()
  const { imageUrl, loading } = useSelector((state: RootState) => state.user)
  const { inputValue, onHandleChangeImage, resetForm, recoveryForm } =
    useForm<typeof initialState>(initialState)
  const dispatch = useDispatch<AppDispatch>()
  const [showButton, setShowButton] = useState(false)
  if (status === 'loading' || loading) return <UserProfileSkeleton />

  const editUserImage = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session?.id) return
    const body = {
      image: inputValue.image,
      userId: session?.id,
    }

    fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const json = await response.json()
        if (!response.ok) throw Error('failed')
        dispatch(updateUserImage(json.imageUrl))
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <div className="profile-container">
      <div className="profile__heading">
        <InputFileBox
          id="input-user-file"
          name="image"
          onHandleChange={onHandleChangeImage}
          value={inputValue.image}
        >
          <InputFileBox.UserImageUploader imageUrl={imageUrl} />
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

      {inputValue.image ? (
        <div className="button-container">
          <Button
            type="basic"
            size="large"
            text="되돌리기"
            onClick={(e) => {
              e.preventDefault()
              resetForm()
            }}
          />
          <Button
            type="black"
            size="large"
            text="수정"
            onClick={(e) => editUserImage(e)}
            disabled={!inputValue.image}
          />
        </div>
      ) : null}
    </div>
  )
}

export default UserProfilePage
