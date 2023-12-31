'use client'
import '@/styles/layout/upload-page.scss'
import InputFileBox from '@/components/common/InputFileBox'
import SideBar from '@/components/upload/SideBar'
import { TEditBlock, useUploadDispatch, useUploadState } from '@/context/UploadContext'
import AddBlockLine from '@/components/upload/AddBlockLine'
import Button from '@/components/common/Button'
import BlockList from '@/components/upload/BlockList'
import { useError, useForm, useModal, useToast } from '@/hooks'
import React, { useEffect, useRef, useState } from 'react'
import BlockHeading from '@/components/upload/input-block/BlockHeading'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { addProject } from '@/store/project/projectSlice'
import LoadingArc from '@/components/common/LoadingArc'
import { useRouter } from 'next/navigation'
import { addUserProjects } from '@/store/user/userSlice'
import BackEnd from '@/lib/network'

export type TInputValue = {
  thumbnail: string
  [key: string]: string
}
interface ISavedUserContent {
  thumbnail?: string
  title?: string
  blocks?: TEditBlock[]
}
const initialInputValue = {
  thumbnail: '',
  title: '',
}
const SAVED_CONTENTS = 'saved-contents'
const UploadPage = () => {
  const { showModal } = useModal()
  const { showToast } = useToast()
  const { blockIndex, editBlocks } = useUploadState()
  const { openSideBar, setInitialBlocks } = useUploadDispatch()
  const titleRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [disable, setDisabled] = useState(false)

  const { inputValue, onHandleChangeImage, onHandleChange, setFormInitialState } =
    useForm<TInputValue>(initialInputValue)

  const handleSave = () => {
    if (!inputValue.thumbnail && !editBlocks.length) {
      return showToast({
        type: 'notification',
        text: '저장할 내용이 없습니다',
      })
    }
    const blocks = editBlocks.map((block) => ({
      ...block,
      value: inputValue[block.name],
    }))
    const savedBlocks = {
      thumbnail: inputValue.thumbnail,
      title: inputValue.title,
      blocks,
    }
    localStorage.setItem(SAVED_CONTENTS, JSON.stringify(savedBlocks))
    showToast({
      type: 'success',
      text: '임시 저장 되었습니다',
    })
  }
  const handleCancel = () => {
    if (!inputValue.thumbnail) {
      return router.back()
    }
    showModal({
      type: 'USER_CONFIRM',
      props: {
        text: '작성 하던 것을 임시 저장 하시겠어요?',
        confirmText: '임시 저장',
        handleConfirm: () => {
          handleSave()
          router.back()
        },
        closeModal: () => {
          router.back()
        },
      },
    })
  }
  const handleUpload = async () => {
    if (!inputValue.title || !inputValue.thumbnail) {
      titleRef.current?.focus()
      return showToast({
        type: 'notification',
        text: '메인 이미지, 제목을 입력해주세요',
      })
    }

    const blocks = editBlocks
      .map((block, index) => ({
        type: block.type,
        value: inputValue[block.name],
      }))
      .filter((block) => !!block.value)
    const body = {
      userId: session?.id,
      title: inputValue.title,
      thumbnail: {
        value: inputValue.thumbnail,
      },
      blocks,
    }
    setLoading(true)
    BackEnd.getInstance()
      .project.uploadProject(body)
      .then((response) => {
        dispatch(addProject(response.uploadProject))
        dispatch(addUserProjects(response.uploadProject))
        localStorage.removeItem(SAVED_CONTENTS)
        showToast({
          type: 'success',
          text: '업로드 되었습니다',
        })
        router.push('/')
      })
      .catch((e) => {
        showModal({
          type: 'USER_SIGNUP',
        })
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    const stringSavedContents = localStorage.getItem(SAVED_CONTENTS)
    if (!stringSavedContents) return
    const loadSaved = () => {
      const parseSavedContents = JSON.parse(stringSavedContents) as ISavedUserContent
      const initialEditBlocks: TEditBlock[] = []
      const initialFormValue: TInputValue = {
        thumbnail: parseSavedContents.thumbnail || '',
        title: parseSavedContents.title || '',
      }
      parseSavedContents.blocks!.forEach((block) => {
        initialEditBlocks.push({ type: block.type, name: block.name, value: '' })
        initialFormValue[block.name] = block.value
      })
      setInitialBlocks(initialEditBlocks)
      setFormInitialState(initialFormValue)
    }
    showModal({
      type: 'USER_CONFIRM',
      props: {
        text: '작성 하던 내용을 불러 오시겠어요?',
        confirmText: '불러오기',
        handleConfirm: loadSaved,
      },
    })
  }, [])
  return (
    <>
      <div className="upload-page">
        <div className="upload__header">
          <div className="button-group">
            <Button type="basic" text="취소" size="medium" onClick={handleCancel} />
          </div>
          <div className="button-group">
            <Button type="grey" text="임시 저장" size="medium" onClick={handleSave} />
            <Button type="black" text="업로드" size="medium" onClick={handleUpload} />
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
    </>
  )
}

export default UploadPage
