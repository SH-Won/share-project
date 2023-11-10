'use client'
import Image from 'next/image'
import Sign from './Sign'
import { useContext } from 'react'
import { SignUpStateContext } from '@/context/SignUpContext'

const SelectSignup = () => {
  const { push, page } = useContext(SignUpStateContext)
  if (page !== 'selectSignup') return null
  return (
    <Sign>
      <Sign.SignHeader text="Sign up" />
      <Sign.Button size="large" type="black" text="Google 로그인" disabled>
        <Image src="/google.svg" width={20} height={20} alt="google" />
      </Sign.Button>
      <Sign.Bar />
      <Sign.Button size="large" type="basic" text="이메일로 로그인" onClick={() => push?.()} />
    </Sign>
  )
}
export default SelectSignup
