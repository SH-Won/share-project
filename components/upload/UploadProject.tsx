'use client'
import '@/styles/layout/upload-project.scss'
import InputBox from '../common/InputBox'
import { Button, Colors, InputBox as Input } from 'my-react-component'
import { useForm, useValidation } from '@/hooks'
import { ChangeEvent } from 'react'
import InputFileBox from '../common/InputFileBox'

const initailState = {
  title: '',
  description: '',
  image: '',
  link: '',
}
const UploadProject = () => {
  const { inputValue, onHandleChange, onHandleChangeImage } =
    useForm<typeof initailState>(initailState)
  const { validatorXSS } = useValidation()
  const defaultProps = {
    onHandleChange,
    validator: validatorXSS,
  }
  const onSubmit = () => {
    console.log(inputValue)
  }
  return (
    <div className="project-container">
      <form onSubmit={onSubmit}>
        <InputFileBox
          name="image"
          onHandleChange={onHandleChangeImage}
          value={inputValue.image}
        />
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
