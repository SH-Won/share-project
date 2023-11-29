import Button from '@/components/common/Button'
import React from 'react'

interface Props {
  text: string
  confirmText: string
  handleConfirm: () => void
  closeModal?: () => void
}
const ConfirmAction = ({ text, confirmText, handleConfirm, closeModal }: Props) => {
  const onConfirm = () => {
    handleConfirm?.()
    closeModal?.()
  }
  return (
    <div className="confirm-modal">
      <p>{text}</p>
      <div className="button-container">
        <Button type="basic" size="small" onClick={closeModal} text="취소" />
        <Button type="black" size="small" onClick={onConfirm} text={confirmText!} />
      </div>
    </div>
  )
}

export default ConfirmAction
