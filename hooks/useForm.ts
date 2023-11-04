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
  return {
    inputValue,
    onHandleChange,
  }
}
export { useForm }
