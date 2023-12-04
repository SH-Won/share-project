'use client'
import { useForm, useValidation } from '@/hooks'
import { BadResponse } from '@/lib/network/fetchAPI'
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
  const [errorMessage, setErrorMessage] = useState('')
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    const user = {
      email: inputValue.email,
      password: inputValue.password,
      redirect: false,
    }
    setDisabled(true)
    await signIn('email-password-credential', user)
      .then((response) => {
        if (response?.error) throw response?.error
        if (response?.ok) router.push('/')
      })
      .catch((e: BadResponse['message']) => {
        setErrorMessage(e)
      })
      .finally(() => {
        setDisabled(false)
      })
  }
  return (
    <form className="sign-form">
      {errorMessage && <div className="sign__result failed">{errorMessage}</div>}
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
        text="로그인"
        disabled={disabled}
        onClick={(e) => onSubmit(e)}
      />
    </form>
  )
}

export default EmailSignInForm
