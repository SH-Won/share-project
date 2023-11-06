'use client'
import { useSearch } from '@/hooks'
import { setUser } from '@/store/user/userSlice'
import { InputBox, Colors, Button } from 'my-react-component'
import { useRouter } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { signIn } from 'next-auth/react'
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  /* background-color: #f5f5f5; */
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`
const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  & > div {
    flex: 1;
  }
`
const LoginPage = () => {
  const { searchText: email, onChangeText: onChangeEmail, emailValidator } = useSearch()
  const { searchText: password, onChangeText: onChangePasswoard, passwordValidator } = useSearch()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const onSubmit = async () => {
    const user = {
      email,
      password,
      redirect: '/',
    }
    const response = await signIn('email-password-credential', user)
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(user),
    //     credentials: 'include',
    //   })
    //   const result = await response.json()
    //   dispatch(setUser(result))
    //   router.replace('/')
    // } catch (e) {
    //   console.log(e)
    // }
  }
  console.log('render login page')
  return (
    <Container>
      <InputBox
        type="text"
        placeholder="email"
        searchText={email}
        onChange={onChangeEmail}
        validator={emailValidator}
      />
      <InputBox
        type="password"
        placeholder="password"
        searchText={password}
        onChange={onChangePasswoard}
        validator={passwordValidator}
      />
      <ButtonWrapper>
        <Button color={Colors.white} fontColor={Colors.grey_111} border={Colors.grey_bbb}>
          취소
        </Button>
        <Button color={Colors.main} click={onSubmit}>
          로그인
        </Button>
      </ButtonWrapper>
    </Container>
  )
}

export default LoginPage
