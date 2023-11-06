'use client'
import '@/styles/layout/upload-project.scss'
import InputBox from '../common/InputBox'
import { Button, Colors } from 'my-react-component'
import { useAuth, useForm, useModal, useValidation } from '@/hooks'
import InputFileBox from '../common/InputFileBox'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

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
  console.log(session)
  const { user, checkLogin } = useAuth()
  const { deleteModal } = useModal()
  const router = useRouter()
  const { inputValue, onHandleChange, onHandleChangeImage } =
    useForm<typeof initailState>(initailState)
  const { validatorXSS } = useValidation()
  const defaultProps = {
    onHandleChange,
    validator: validatorXSS,
  }
  useEffect(() => {
    const go = async () => {
      close?.()
    }
    // document.body.style.overflow = 'hidden'
    // window.addEventListener('popstate', go)
    // return () => {
    //   document.body.style.removeProperty('overflow')
    //   window.removeEventListener('popstate', go)
    // }
  }, [])
  const onSubmit = async (e: MouseEvent) => {
    e.preventDefault()
    const body = {
      ...inputValue,
      userId: user.id,
      category: 0,
      link: 'https://github.com/SH-Won',
    }
    try {
      await checkLogin()
        .then((response) => {
          if (!response) return { ok: false }
          else {
            body.userId = response.id
            return fetch('http://localhost:3000/api/upload', {
              method: 'POST',
              body: JSON.stringify(body),
            })
          }
        })
        .then((response) => {
          if (response.ok) close?.()
          else {
            deleteModal()
            router.replace('/login')
          }
        })
    } catch (e) {
      console.log(e)
      //
    }
  }
  return (
    <div className="project-container">
      <form>
        <InputFileBox name="image" onHandleChange={onHandleChangeImage} value={inputValue.image} />
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
            color={Colors.white}
            fontColor={Colors.grey_111}
            border={Colors.grey_bbb}
            click={() => close?.()}
          >
            취소
          </Button>
          <Button color={Colors.main} fontColor={Colors.white} click={onSubmit}>
            올리기
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UploadProject
