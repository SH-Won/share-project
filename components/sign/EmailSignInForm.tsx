'use client'
import { useForm, useValidation } from '@/hooks'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../common/Button'
import InputBox from '../common/InputBox'

const initialState = {
  email: '',
  password: '',
}

const EmailSignInForm = () => {
  const router = useRouter()
  const { inputValue, onHandleChange } = useForm<typeof initialState>(initialState)
  const { emailValidator, passwordValidator } = useValidation()
  const [disabled, setDisabled] = useState(false)
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    const user = {
      email: inputValue.email,
      password: inputValue.password,
      redirect: false,
    }
    setDisabled(true)
    await signIn('email-password-credential', user).then((response) => {
      if (response?.ok) router.push('/')
      else setDisabled(false)
    })
  }
  return (
    <form className="sign-form">
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
      <Button
        size="large"
        type="black"
        text="로그인"
        disabled={disabled}
        onClick={(e) => onSubmit(e)}
      />
    </form>
  )
}

export default EmailSignInForm
