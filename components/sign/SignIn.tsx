import Image from 'next/image'
import EmailSignInForm from './EmailSignInForm'
import Sign from './Sign'

const SignIn = () => {
  return (
    <>
      <Sign>
        <Sign.SignHeader text="로그인" />
        <Sign.Button size="large" type="basic" text="Google로 로그인" disabled>
          <Image src="/google.svg" width={24} height={24} alt="google" />
        </Sign.Button>
        <Sign.Bar />
        <EmailSignInForm />
        <Sign.AuthLink type="signup" />
      </Sign>
    </>
  )
}

export default SignIn
