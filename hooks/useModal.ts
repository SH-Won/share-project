'use client'
import { ModalSetterContext, ModalStateContext, TModalState } from '@/context/ModalContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext } from 'react'

interface FOO {
  type: TModalState['type']
}
const modalType: TModalState['type'][] = ['bottomSheet', 'basic']
const modalTypeChecker = (type: unknown): boolean => {
  if (typeof type !== 'string') return false
  return modalType.includes(type as TModalState['type']) ? true : false
}
const createQueryUrl = (params: TModalState) => {
  return `?type=${params.type}`
}
const useModal = () => {
  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const type = searchParams.get('type')
  const modalState = useContext(ModalStateContext)
  const isModalOpen = modalTypeChecker(modalState.type)
  const setModalState = useContext(ModalSetterContext)
  if (!setModalState) {
    throw new Error('MyConsumer must be used within a MyProvider')
  }
  const showModal = (params: TModalState) => {
    setModalState(params)
    // router.push(createQueryUrl(params))
  }
  // console.log(isModalOpen)
  const closeModal = () => setModalState({} as TModalState)

  return {
    isModalOpen,
    modalState,
    showModal,
    closeModal,
  }
}

export { useModal }
