import Link from 'next/link'
import React from 'react'
import Button from '../common/Button'

interface SignProps {
  children: React.ReactNode
}
export const SignHeader = ({ text }: { text: string }) => {
  return <h1 className="sign__title">{text}</h1>
}
export const Bar = () => {
  return <hr className="bar" />
}
export const AuthLink = ({ type }: { type: 'signin' | 'signup' }) => {
  const text = type === 'signin' ? '이미 회원 이신가요?' : '회원이 아니신가요?'
  const link = type === 'signin' ? '/signin' : '/signup'
  const linkText = type === 'signin' ? '로그인' : '회원가입'
  return (
    <div className="sign__auth-link">
      <span>{text}</span>
      <Link href={link}>{linkText}</Link>
    </div>
  )
}
const Sign = ({ children }: SignProps) => {
  return <>{children}</>
}
Sign.SignHeader = SignHeader
Sign.Bar = Bar
Sign.Button = Button
Sign.AuthLink = AuthLink

export default Sign
