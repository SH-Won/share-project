'use client'
import { useForm, useValidation } from '@/hooks'
import InputBox from '@/components/common/InputBox'
import Button from '../common/Button'
import { useContext, useState } from 'react'
import { SignUpStateContext } from '@/context/SignUpContext'
const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
}
const EmailSignUpForm = () => {
  const { setState, goPage } = useContext(SignUpStateContext)
  const [disabled, setDisabled] = useState(false)
  const { inputValue, onHandleChange } = useForm<typeof initialState>(initialState)
  const { emailValidator, passwordValidator } = useValidation()
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    const entries = Object.values(inputValue)
    if (entries.some((entry) => !entry)) {
      setState((prev) => ({
        ...prev,
        result: {
          type: 'error',
          message: '모든 항목을 기입 하셔야 합니다',
        },
      }))
      return
    }
    // validation 도 필요함
    const body = {
      name: inputValue.name,
      userName: inputValue.username,
      email: inputValue.email,
      password: inputValue.password,
    }
    setDisabled(true)
    await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then(async (response) => {
      const json = await response.json()
      if (response.status !== 200) {
        setState((prev) => ({
          ...prev,
          result: {
            type: 'error',
            message: json.message,
          },
        }))
        setDisabled(false)
      } else {
        setState((prev) => ({
          ...prev,
          result: {
            type: 'success',
            message: json.message,
          },
        }))
        goPage?.('signupSuccess')
      }
    })
  }
  return (
    <form className="sign-form">
      <InputBox
        type="text"
        name="name"
        placeholder="name"
        value={inputValue.name}
        onHandleChange={onHandleChange}
        validator={emailValidator}
      >
        <InputBox.Label name="name" />
      </InputBox>
      <InputBox
        type="text"
        name="username"
        placeholder="user name"
        value={inputValue.username}
        onHandleChange={onHandleChange}
        validator={emailValidator}
      >
        <InputBox.Label name="username" />
      </InputBox>
      <InputBox
        type="text"
        name="email"
        placeholder="email"
        value={inputValue.email}
        onHandleChange={onHandleChange}
        validator={emailValidator}
      >
        <InputBox.Label name="email" />
      </InputBox>
      <InputBox
        type="password"
        name="password"
        placeholder="password"
        value={inputValue.password}
        onHandleChange={onHandleChange}
        validator={passwordValidator}
      >
        <InputBox.Label name="password" />
      </InputBox>
      <Button
        size="large"
        type="black"
        text="가입 하기"
        disabled={disabled}
        onClick={(e) => onSubmit(e)}
      />
    </form>
  )
}

export default EmailSignUpForm
