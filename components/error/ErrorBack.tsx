import Image from 'next/image'
import React from 'react'
import Button from '../common/Button'
interface Props {
  onClick: () => void
  message?: string
}
const ErrorBack = ({ onClick, message }: Props) => {
  return (
    <div className="error-container">
      <div>
        {/* <Image src="/arrowLeft.svg" width={50} height={50} alt="back" /> */}
        <span>{message}</span>
        <Button type="basic" size="medium" text="뒤로가기" onClick={onClick} />
      </div>
    </div>
  )
}

export default ErrorBack
