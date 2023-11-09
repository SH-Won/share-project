import '@/styles/components/login.scss'
import LoginPage from '@/components/Login'
import SelectSignup from '@/components/login/SelectSignup'

const page = () => {
  return (
    <section className="login-page">
      <SelectSignup />
    </section>
  )
}

export default page
