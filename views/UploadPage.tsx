'use client'
import InputFileBox from '@/components/common/InputFileBox'
import SideBar from '@/components/upload/SideBar'
import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import AddBlockLine from '@/components/upload/AddBlockLine'
import Button from '@/components/common/Button'
import BlockList from '@/components/upload/BlockList'
import { useError, useForm } from '@/hooks'
import React, { useCallback, useRef, useState } from 'react'
import BlockHeading from '@/components/upload/input-block/BlockHeading'
import { useSession } from 'next-auth/react'
import { uploadProject } from '@/lib/api'
import { handleJson } from '@/lib/responseHandler'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { addProject } from '@/store/project/projectSlice'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import LoadingWave from '@/components/common/LoadingWave'
import LoadingArc from '@/components/common/LoadingArc'
import { useRouter } from 'next/navigation'

export type TInputValue = {
  thumbnail: string
  [key: string]: string
}
const initialInputValue = {
  thumbnail: '',
  title: '',
}
const UploadPage = () => {
  const { blockIndex, editBlocks } = useUploadState()
  const { openSideBar } = useUploadDispatch()
  const titleRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const { handleError } = useError()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { inputValue, onHandleChangeImage, onHandleChange } =
    useForm<TInputValue>(initialInputValue)

  const onClick = async () => {
    if (!inputValue.title) {
      titleRef.current?.focus()
      return
    }
    const blocks = editBlocks.map((block, index) => ({
      type: block.type,
      value: inputValue[block.name],
    }))
    const body = {
      userId: session?.id,
      title: inputValue.title,
      thumbnail: {
        value: inputValue.thumbnail,
      },
      blocks,
    }
    setLoading(true)
    uploadProject(body)
      // .then((response) => handleJson(response))
      .then((response) => {
        // alert('업로드 완료')
        // console.log(response)
        dispatch(addProject(response.uploadProject))
        router.push('/')
      })
      .catch(handleError)
      .finally(() => setLoading(false))
  }
  console.log('upload page render')
  return (
    <div className="upload-page">
      <div className="upload__header">
        <div className="button-group">
          <Button type="basic" text="취소" size="medium" />
        </div>
        <div className="button-group">
          <Button type="grey" text="임시 저장" size="medium" />
          <Button type="black" text="업로드" size="medium" onClick={onClick} />
        </div>
      </div>
      <SideBar />
      <div className="upload__content">
        {inputValue.thumbnail && (
          <div ref={titleRef} tabIndex={1} className="upload__content__title">
            <BlockHeading
              onHandleChange={onHandleChange}
              placeholder="제목을 입력해 주세요"
              value={inputValue.title}
              name="title"
            />
          </div>
        )}
        <div className="file-upload-wrapper">
          <InputFileBox
            id="thumbnail"
            name="thumbnail"
            value={inputValue.thumbnail}
            onHandleChange={onHandleChangeImage}
          >
            <InputFileBox.ProjectUploader />
          </InputFileBox>
        </div>
        {/* {inputValue.thumbnail ? ( */}
        <>
          <AddBlockLine
            onClick={() => {
              // setOpenSideBar(true)
              openSideBar()
              blockIndex.current = 0
            }}
          />
          <BlockList
            inputValue={inputValue}
            onHandleChange={onHandleChange}
            onHandleChangeImage={onHandleChangeImage}
          />
        </>
        {/* ) : null} */}
      </div>
      {loading ? <LoadingArc text="업로드 중입니다" /> : null}
    </div>
  )
}

export default UploadPage
