import Image from 'next/image'
import React from 'react'
import Button from '../common/Button'
interface Props {
  onClick: () => void
  message?: string
}
const ErrorNotification = ({ onClick }: Props) => {
  return (
    <div className="error-container">
      <div>
        <Image src="/refresh.svg" width={50} height={50} alt="refresh" />
        <Button type="basic" size="medium" text="다시 불러오기" onClick={onClick} />
      </div>
    </div>
  )
}

export default ErrorNotification
