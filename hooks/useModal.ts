'use client'
import { IModalState, TModalKey } from '@/components/modal/config'
import { ModalSetterContext, ModalStateContext, ICustomModalState } from '@/context/ModalContext'
import { useContext } from 'react'

const modalType: ICustomModalState['type'][] = ['bottomSheet', 'basic']
const modalTypeChecker = (type: unknown): boolean => {
  if (typeof type !== 'string') return false
  return modalType.includes(type as ICustomModalState['type']) ? true : false
}
const createQueryUrl = (params: ICustomModalState) => {
  return `?type=${params.type}`
}

const useModal = () => {
  const { customModalState, modalState } = useContext(ModalStateContext)
  const { setCustomModalState, setModalState } = useContext(ModalSetterContext)
  if (!setModalState || !setCustomModalState) {
    throw new Error('MyConsumer must be used within a MyProvider')
  }
  const showCustomModal = (params: ICustomModalState) => {
    setCustomModalState(params)
  }
  const closCustomModal = () => setCustomModalState({} as ICustomModalState)

  const showModal = (modalState: IModalState) => {
    setModalState((prev) => [...prev, modalState])
  }
  const closeModal = () => {
    setModalState((prev) => prev.slice(0, prev.length - 1))
  }
  return {
    // isModalOpen,
    customModalState,
    modalState,
    showModal,
    closeModal,
    showCustomModal,
    closCustomModal,
  }
}

export { useModal }
