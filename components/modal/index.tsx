'use client'
import { useModal } from '@/hooks'
import BottomSheetModal from './BottomSheetModal'
import React, { useCallback, useMemo } from 'react'
import BasicModal from './BasicModal'
import ModalHeader from './ModalHeader'
import ConfirmAction from '../upload/modal/ConfirmAction'
import SignupPage from '@/views/SignupPage'

const MODAL_CONFIG = {
  user_confirm: ConfirmAction,
  user_signin: SignupPage,
}
export type TModalKey = keyof typeof MODAL_CONFIG
export type TModalComponent<T extends TModalKey> = (typeof MODAL_CONFIG)[T]

const Modal = () => {
  const {
    // isModalOpen,
    modalState: ModalState,
    closeModal,
    customModalState: CustomModalState,
    closCustomModal,
  } = useModal()
  const modalOpen = ModalState.length || CustomModalState.type
  const CustomModalLayout = useCallback(() => {
    switch (CustomModalState.type) {
      case 'bottomSheet':
        return (
          <BottomSheetModal>
            <ModalHeader closeModal={closCustomModal} />
            <CustomModalState.Component {...CustomModalState.props} />
          </BottomSheetModal>
        )
      case 'basic':
        return (
          <BasicModal>
            <ModalHeader closeModal={closCustomModal} />
            <CustomModalState.Component {...CustomModalState.props} closeModal={closeModal} />
          </BasicModal>
        )
      default:
        return null
    }
  }, [CustomModalState.type])

  const ModalLayout = useCallback(() => {
    return (
      <>
        {ModalState.map((modal, index) => {
          const Component = MODAL_CONFIG[modal.type]
          return (
            <BasicModal key={index}>
              <ModalHeader closeModal={closeModal} />
              <Component {...modal.props} closeModal={closeModal} />
            </BasicModal>
          )
        })}
      </>
    )
  }, [ModalState])
  return (
    <React.Fragment>
      {modalOpen ? (
        <>
          <CustomModalLayout />
          <ModalLayout />
        </>
      ) : null}
    </React.Fragment>
  )
}

export default Modal
