import InputFileBox from '@/components/common/InputFileBox'
import React, { ChangeEvent } from 'react'
interface InputBoxProps {
  name: string
  value: string
  validator?: (text: string) => boolean
  onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void
  focus?: boolean
}
const BlockImage = ({ name, value, focus, onHandleChange }: InputBoxProps) => {
  return (
    <InputFileBox name={name} id={name} value={value} onHandleChange={onHandleChange}>
      <InputFileBox.Uploader focus={focus} />
    </InputFileBox>
  )
}

export default BlockImage
