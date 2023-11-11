import SelectSignup from '@/components/sign/SelectSignup'
import SignUpContext from '@/context/SignUpContext'
import SignUp from '@/components/sign/SignUp'
import { AuthLink } from '@/components/sign/Sign'
import SignUpSuccess from '@/components/sign/SignUpSuccess'

const page = () => {
  return (
    <div className="sign-page">
      <SignUpContext>
        <SelectSignup />
        <SignUp />
        <SignUpSuccess />
      </SignUpContext>
    </div>
  )
}

export default page
