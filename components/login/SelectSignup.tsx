import Button from '../common/Button'

const SelectSignup = () => {
  return (
    <div className="login-container">
      <h1 className="login__title">Sign up</h1>
      <Button size="large" type="black" text="Google 로그인" />
      <hr className="bar"></hr>
      <Button size="large" type="basic" text="이메일로 로그인" />
    </div>
  )
}

export default SelectSignup
