'use client'
import Image from 'next/image'
import Sign from './Sign'
import { useContext } from 'react'
import { SignUpStateContext } from '@/context/SignUpContext'
import { useSession } from 'next-auth/react'

const SelectSignup = () => {
  const { data } = useSession()
  const { goPage, page } = useContext(SignUpStateContext)
  if (page !== 'selectSignup') return null
  return (
    <Sign>
      <Sign.SignHeader text="회원가입" />
      <Sign.Button size="large" type="black" text="Google 로그인" disabled>
        <Image src="/google.svg" width={20} height={20} alt="google" />
      </Sign.Button>
      <Sign.Bar />
      <Sign.Button
        size="large"
        type="basic"
        text="이메일로 가입하기"
        onClick={() => goPage?.('emailSignup')}
      />
      <Sign.AuthLink type="signin" />
    </Sign>
  )
}
export default SelectSignup
