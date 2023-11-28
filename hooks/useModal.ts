'use client'
import { TModalComponent, TModalKey } from '@/components/modal'
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

interface IShowModalProps<T extends TModalKey> {
  type: T
  props: Parameters<TModalComponent<T>>[0]
}
const useModal = () => {
  const { customModalState, modalState } = useContext(ModalStateContext)
  // const isModalOpen = modalTypeChecker(modalState.type)
  const { setCustomModalState, setModalState } = useContext(ModalSetterContext)
  if (!setModalState || !setCustomModalState) {
    throw new Error('MyConsumer must be used within a MyProvider')
  }
  const showCustomModal = (params: ICustomModalState) => {
    setCustomModalState(params)
  }
  const closCustomModal = () => setCustomModalState({} as ICustomModalState)

  const showModal = <T extends TModalKey>({ type, props }: IShowModalProps<T>) => {
    setModalState((prev) => [...prev, { type, props }])
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
