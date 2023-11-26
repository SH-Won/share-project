import Button from '@/components/common/Button'
import React from 'react'

interface Props {
  deleteBlock: () => void
  closeModal: () => void
}
const ConfirmDelete = ({ deleteBlock, closeModal }: Props) => {
  const onConfirm = () => {
    deleteBlock()
    closeModal()
  }
  return (
    <div className="confirm-modal">
      <p>정말 삭제 하시겠어요?</p>
      <div className="button-container">
        <Button type="basic" size="small" onClick={closeModal} text="취소" />
        <Button type="black" size="small" onClick={onConfirm} text="삭제" />
      </div>
    </div>
  )
}

export default ConfirmDelete
