'use client'
import { useModal } from '@/hooks'
import BottomSheetModal from './BottomSheetModal'
import React, { useCallback } from 'react'
import BasicModal from './BasicModal'
import Close from './Close'
import ModalHeader from './ModalHeader'
// import { Popup } from 'my-react-component'

const Modal = () => {
  const { isModalOpen, modalState: ModalState, closeModal } = useModal()
  const ModalLayout = useCallback(() => {
    switch (ModalState.type) {
      case 'bottomSheet':
        return (
          <BottomSheetModal>
            <ModalState.Component {...ModalState.props} />
          </BottomSheetModal>
        )
      case 'basic':
        return (
          <BasicModal>
            <ModalHeader closeModal={closeModal} />
            <ModalState.Component {...ModalState.props} />
          </BasicModal>
        )
      default:
        return null
    }
  }, [ModalState.type])
  return (
    <React.Fragment>
      {isModalOpen ? (
        <div className="modal">
          <ModalLayout />
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default Modal
