import React from 'react'
interface BasicModalProps {
  children: React.ReactNode
  closeModal: () => void
}
const BasicModal = ({ children, closeModal }: BasicModalProps) => {
  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal__container--basic">{children}</div>
    </div>
  )
}

export default BasicModal
