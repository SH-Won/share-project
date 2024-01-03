'use client'
import '@/styles/layout/user-profile.scss'
import Button from '@/components/common/Button'
import InputFileBox from '@/components/common/InputFileBox'
import UserProfileSkeleton from '@/components/user/UserProfileSkeleton'
import { useForm, useToast } from '@/hooks'
import { AppDispatch, RootState } from '@/store'
import { setLoading, updateUserImage } from '@/store/user/userSlice'
import { useSession } from 'next-auth/react'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingArc from '@/components/common/LoadingArc'
import BackEnd from '@/lib/network'

const initialState = {
  image: '',
}
const UserEditProfile = () => {
  const { data: session, status, update: sessionUpdate } = useSession()
  const [updateLoading, setUpdateLoading] = useState(false)
  // const { imageUrl, loading } = useSelector((state: RootState) => state.user)
  const { inputValue, onHandleChangeImage, resetForm, recoveryForm } =
    useForm<typeof initialState>(initialState)
  const dispatch = useDispatch<AppDispatch>()
  const [showButton, setShowButton] = useState(false)
  const { showToast } = useToast()
  if (status === 'loading') return <UserProfileSkeleton />

  const editUserImage = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session?.id) return
    const body = {
      image: inputValue.image,
      userId: session?.id,
    }
    setUpdateLoading(true)
    BackEnd.getInstance()
      .user.updateUserImage(body)
      .then((response) => {
        sessionUpdate({
          imageUrl: response.imageUrl,
        })
        resetForm()
      })
      .catch((e) => {
        showToast({
          type: 'error',
          text: '프로필 수정에 실패했습니다',
        })
      })
      .finally(() => setUpdateLoading(false))
  }
  return (
    <div className="edit-profile-container">
      <div className="profile__heading">
        <InputFileBox
          id="input-user-file"
          name="image"
          onHandleChange={onHandleChangeImage}
          value={inputValue.image}
        >
          <InputFileBox.UserImageUploader imageUrl={session!.imageUrl} />
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
        <div>
          <div className="button-container">
            <Button
              type="basic"
              size="medium"
              text="되돌리기"
              onClick={(e) => {
                e.preventDefault()
                resetForm()
              }}
            />
            <Button
              type="black"
              size="medium"
              text="수정"
              onClick={(e) => editUserImage(e)}
              disabled={!inputValue.image}
            />
          </div>
        </div>
      ) : null}
      {updateLoading && <LoadingArc text="업데이트 중입니다" />}
    </div>
  )
}

export default UserEditProfile
