import '@/styles/components/signup.scss'
import LoginPage from '@/components/Login'
import SelectSignup from '@/components/sign/SelectSignup'
import SignUpContext from '@/context/SignUpContext'
import EmailSignup from '@/components/sign/EmailSignup'

const page = () => {
  return (
    <div className="signup-page">
      <SignUpContext>
        <SelectSignup />
        <EmailSignup />
      </SignUpContext>
    </div>
  )
}

export default page
