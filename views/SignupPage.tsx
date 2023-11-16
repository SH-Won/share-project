import SelectSignup from '@/components/sign/SelectSignup'
import SignUp from '@/components/sign/SignUp'
import SignUpSuccess from '@/components/sign/SignUpSuccess'
import SignUpContext from '@/context/SignUpContext'
import React from 'react'

const SignupPage = () => {
  return (
    <SignUpContext>
      <SelectSignup />
      <SignUp />
      <SignUpSuccess />
    </SignUpContext>
  )
}

export default SignupPage
