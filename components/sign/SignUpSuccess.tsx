'use client'
import { SignUpStateContext } from '@/context/SignUpContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import Sign from './Sign'

const SignUpSuccess = () => {
  const router = useRouter()
  const { result, page } = useContext(SignUpStateContext)
  if (page !== 'signupSuccess') return null
  return (
    <Sign>
      {result.type === 'success' && (
        <div className="sign__result success">
          <Image src="/success.svg" alt="success_sign-up" width={48} height={48} />
          {result.message}
        </div>
      )}
      <Sign.Button
        size="large"
        type="basic"
        text="로그인 하러 가기"
        onClick={() => router.replace('/signin')}
      />
      <Sign.AuthLink type="signin" />
    </Sign>
  )
}

export default SignUpSuccess
