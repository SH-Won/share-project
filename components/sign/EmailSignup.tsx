'use client'
import { SignUpStateContext } from '@/context/SignUpContext'
import Image from 'next/image'
import React, { useContext } from 'react'
import EmailForm from './EmailForm'
import Sign from './Sign'

const EmailSignup = () => {
  const { back, page } = useContext(SignUpStateContext)
  if (page !== 'emailSignup') return null
  return (
    <Sign>
      <div className="signup-back" onClick={() => back?.()}>
        <Image src="/arrowLeft.svg" alt="back_to_select_signup" width={14} height={14} />
      </div>
      <Sign.SignHeader text="이메일로 가입하기" />
      <EmailForm />
    </Sign>
  )
}

export default EmailSignup
