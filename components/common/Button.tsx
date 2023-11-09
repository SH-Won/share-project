'use client'
import '@/styles/components/button.scss'

interface ButtonProps {
  size: 'small' | 'medium' | 'large'
  type: 'basic' | 'black'
  text: string
  onClick?: () => void
}

const Button = ({ size, type, text, onClick }: ButtonProps) => {
  return <button className={`button ${type} ${size}`}>{text}</button>
}

export default Button
