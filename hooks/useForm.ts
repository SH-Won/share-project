'use client'
import { ChangeEvent, useState } from 'react'

const useForm = <T>(initialState: T) => {
  const [inputValue, setInputValue] = useState(initialState)
  const onHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const onHandleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
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
  const resetForm = () => {
    setInputValue(initialState)
  }
  const recoveryForm = (inputState: T) => {
    setInputValue(inputState)
  }
  const setFormInitialState = (initialState: T) => {
    setInputValue(initialState)
  }
  return {
    inputValue,
    onHandleChange,
    onHandleChangeImage,
    resetForm,
    recoveryForm,
    setFormInitialState,
  }
}
export { useForm }
