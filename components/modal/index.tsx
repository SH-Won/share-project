'use client'
import { useModal } from '@/hooks'
import BottomSheetModal from './BottomSheetModal'
import React, { useCallback, useMemo } from 'react'
import BasicModal from './BasicModal'
import ModalHeader from './ModalHeader'
import { MODAL_CONFIG, MODAL_KEY, TModalProps } from './config'

const Modal = () => {
  const {
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
          <BasicModal closeModal={closeModal}>
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
          switch (modal.type) {
            case 'USER_CONFIRM': {
              const Component = MODAL_CONFIG[modal.type]
              const props = modal.props
              return (
                <BasicModal key={index} closeModal={closeModal}>
                  <ModalHeader closeModal={closeModal} />
                  <Component
                    {...props}
                    closeModal={() => {
                      closeModal()
                      props.closeModal?.()
                    }}
                  />
                </BasicModal>
              )
            }

            case 'USER_SIGNUP': {
              const Component = MODAL_CONFIG[modal.type]
              return (
                <BasicModal key={index} closeModal={closeModal}>
                  <ModalHeader closeModal={closeModal} />
                  <Component />
                </BasicModal>
              )
            }
          }
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
