'use client'
import { useForm, useSearch, useValidation } from '@/hooks'
import { Colors, Button } from 'my-react-component'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { signIn } from 'next-auth/react'
import InputBox from './common/InputBox'

const initialState = {
  email: '',
  password: '',
}
const LoginPage = () => {
  const { inputValue, onHandleChange } = useForm<typeof initialState>(initialState)
  const { emailValidator, passwordValidator } = useValidation()
  const router = useRouter()
  const onSubmit = async () => {
    const user = {
      email: inputValue.email,
      password: inputValue.password,
      redirect: false,
    }
    const response = await signIn('email-password-credential', user).then((response) => {
      if (response?.ok) router.replace('/')
    })
  }

  return (
    <section className="login-container">
      <InputBox
        type="text"
        name="email"
        placeholder="email"
        value={inputValue.email}
        onHandleChange={onHandleChange}
        validator={emailValidator}
      />
      <InputBox
        type="password"
        name="password"
        placeholder="password"
        value={inputValue.password}
        onHandleChange={onHandleChange}
        validator={passwordValidator}
      />
      <div className="button-container">
        <Button color={Colors.white} fontColor={Colors.grey_111} border={Colors.grey_bbb}>
          취소
        </Button>
        <Button color={Colors.main} fontColor={Colors.white} click={onSubmit}>
          로그인
        </Button>
      </div>
    </section>
  )
}

export default LoginPage
