'use client'
import { SignUpStateContext } from '@/context/SignUpContext'
import Image from 'next/image'
import React, { useContext } from 'react'
import EmailSignUpForm from './EmailSignUpForm'
import Sign from './Sign'

const SignUp = () => {
  const { page, goPage, result } = useContext(SignUpStateContext)
  if (page !== 'emailSignup') return null
  return (
    <Sign>
      <div className="signup-back" onClick={() => goPage?.('selectSignup')}>
        <Image src="/arrowLeft.svg" alt="back_to_select_signup" width={14} height={14} />
      </div>
      <Sign.SignHeader text="이메일로 가입하기" />
      {result.type === 'error' && <div className="sign__result failed">{result.message}</div>}
      <EmailSignUpForm />
      <Sign.AuthLink type="signin" />
    </Sign>
  )
}

export default SignUp
