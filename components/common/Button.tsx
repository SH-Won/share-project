'use client'
import '@/styles/components/button.scss'

interface ButtonProps {
  size: 'small' | 'medium' | 'large'
  type: 'basic' | 'black'
  text: string
  disabled?: boolean
  children?: React.ReactNode
  onClick?: (() => void) | ((e: React.MouseEvent) => void)
}

const Button = ({ size, type, text, disabled, children, onClick }: ButtonProps) => {
  return (
    <button className={`button ${type} ${size}`} disabled={disabled} onClick={onClick}>
      {children}
      {text}
    </button>
  )
}

export default Button
