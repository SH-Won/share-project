'use client'

interface ButtonProps {
  size: 'small' | 'medium' | 'large'
  type: 'basic' | 'black' | 'grey'
  text: string
  border?: boolean
  disabled?: boolean
  children?: React.ReactNode
  onClick?: (() => void) | ((e: React.MouseEvent) => void)
}

const Button = ({ size, type, text, border = true, disabled, children, onClick }: ButtonProps) => {
  return (
    <button className={`button ${type} ${size}`} disabled={disabled} onClick={onClick}>
      {children}
      {text}
    </button>
  )
}

export default Button
