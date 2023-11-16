import Image from 'next/image'
import React from 'react'
type ModalHeaderProps = {
  closeModal: () => void
}
const ModalHeader = ({ closeModal }: ModalHeaderProps) => {
  return (
    <div className="modal_header">
      <div></div>
      <div></div>
      <div className="modal__close-button" onClick={closeModal}>
        <Image src="/close.svg" alt="close" width={24} height={24} />
      </div>
    </div>
  )
}

export default ModalHeader
