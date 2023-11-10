import React from 'react'
import Button from '../common/Button'

interface SignProps {
  children: React.ReactNode
}
const SignHeader = ({ text }: { text: string }) => {
  return <h1 className="signup__title">{text}</h1>
}
const Bar = () => {
  return <hr className="bar" />
}
const AuthLink = ({ text }: { text: string }) => {}
const Sign = ({ children }: SignProps) => {
  return <>{children}</>
}
Sign.SignHeader = SignHeader
Sign.Bar = Bar
Sign.Button = Button

export default Sign
