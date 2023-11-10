'use client'
import { useForm, useValidation } from '@/hooks'
import InputBox from '@/components/common/InputBox'
import Button from '../common/Button'
const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
}
const EmailForm = () => {
  const { inputValue, onHandleChange } = useForm<typeof initialState>(initialState)
  const { emailValidator, passwordValidator } = useValidation()
  const onSubmit = async () => {}
  return (
    <form className="signup-form">
      <InputBox
        type="text"
        name="name"
        placeholder="name"
        value={inputValue.name}
        onHandleChange={onHandleChange}
        validator={emailValidator}
      />
      <InputBox
        type="text"
        name="username"
        placeholder="user name"
        value={inputValue.username}
        onHandleChange={onHandleChange}
        validator={emailValidator}
      />
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
      <Button size="medium" type="black" text="가입 하기" />
    </form>
  )
}

export default EmailForm
