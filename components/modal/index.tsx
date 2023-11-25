'use client'
import { useModal } from '@/hooks'
import BottomSheetModal from './BottomSheetModal'
import React, { useCallback } from 'react'
import BasicModal from './BasicModal'
import ModalHeader from './ModalHeader'
// import { Popup } from 'my-react-component'

const Modal = () => {
  const { isModalOpen, modalState: ModalState, closeModal } = useModal()
  const ModalLayout = useCallback(() => {
    switch (ModalState.type) {
      case 'bottomSheet':
        return (
          <BottomSheetModal>
            <ModalHeader closeModal={closeModal} />
            <ModalState.Component {...ModalState.props} />
          </BottomSheetModal>
        )
      case 'basic':
        return (
          <BasicModal>
            <ModalHeader closeModal={closeModal} />
            <ModalState.Component {...ModalState.props} closeModal={closeModal} />
          </BasicModal>
        )
      default:
        return null
    }
  }, [ModalState.type])
  console.log(ModalState)
  return <React.Fragment>{isModalOpen ? <ModalLayout /> : null}</React.Fragment>
}

export default Modal
