'use client'
import '@/styles/layout/upload-project.scss'
import InputBox from '../common/InputBox'
import { useForm, useValidation } from '@/hooks'
import InputFileBox from '../common/InputFileBox'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { addProject } from '@/store/project/projectSlice'
import { IProject } from '@/app/page'
import Button from '../common/Button'
const initailState = {
  title: '',
  description: '',
  image: '',
  link: '',
}
interface UploadProjectProps {
  close?: () => void
}
const UploadProject = ({ close }: UploadProjectProps) => {
  const session = useSession()
  const dispatch = useDispatch<AppDispatch>()
  const { inputValue, onHandleChange, onHandleChangeImage } =
    useForm<typeof initailState>(initailState)
  const { validatorXSS } = useValidation()
  const defaultProps = {
    onHandleChange,
    validator: validatorXSS,
  }
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    const body = {
      ...inputValue,
      userId: session.data?.id,
      category: 0,
      link: 'https://github.com/SH-Won',
    }
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/upload', {
        method: 'POST',
        body: JSON.stringify(body),
      })
      if (response.ok) {
        const uploadProject = (await response.json()).uploadProject as IProject
        console.log(uploadProject)
        dispatch(addProject(uploadProject))
        close?.()
        // router.refresh()
      } else {
        alert('권한이 없습니다, 로그인 하시겠어요?')
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="project-container">
      <form>
        <InputFileBox name="image" onHandleChange={onHandleChangeImage} value={inputValue.image}>
          <InputFileBox.Title text="사진 추가" />
          <InputFileBox.ProjectUploader />
        </InputFileBox>
        <InputBox
          name="title"
          value={inputValue.title}
          placeholder="제목을 입력해주세요"
          {...defaultProps}
        />
        <InputBox
          name="description"
          value={inputValue.description}
          placeholder="간단한 설명을 입력해주세요"
          {...defaultProps}
        />
        <InputBox
          name="link"
          value={inputValue.link}
          placeholder="링크를 입력해주세요"
          {...defaultProps}
        />
        <div className="button-container">
          <Button
            type="basic"
            size="large"
            text="취소"
            onClick={(e) => {
              e.preventDefault()
              close?.()
            }}
          />
          <Button type="black" size="large" text="올리기" onClick={(e) => onSubmit(e)} />
        </div>
      </form>
    </div>
  )
}

export default UploadProject
