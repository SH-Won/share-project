'use client'
import { useModal } from '@/hooks'
import React from 'react'
import '@/styles/layout/modal.scss'
import BottomModal from './BottomModal'

const Modal = () => {
  const { modalStack, deleteModal } = useModal()

  const RenderModal = () => {
    return modalStack.map((modalState, index) => {
      switch (modalState.type) {
        case 'bottomModal':
          return (
            <BottomModal close={deleteModal} key={index}>
              <modalState.component {...modalState.props} />
            </BottomModal>
          )
        default:
          return <></>
      }
    })
  }

  return <React.Fragment>{RenderModal()}</React.Fragment>
}

export default Modal
