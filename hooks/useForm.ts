import { ChangeEvent, useState } from 'react'

const useForm = <T>(initialState: T) => {
  const [inputValue, setInputValue] = useState(initialState)
  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const onHandleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, files } = e.target
    const file = files?.[0]
    if (!file) return
    if (!file.type.includes('image')) {
      alert('이미지 파일만 가능해요!')
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      setInputValue((prev) => ({
        ...prev,
        [name]: result,
      }))
    }
  }
  return {
    inputValue,
    onHandleChange,
    onHandleChangeImage,
  }
}
export { useForm }
