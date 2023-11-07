'use client'
import { ModalSetterContext, ModalStateContext } from '@/context/ModalContext'
import { AppDispatch, RootState } from '@/store'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, ModalStack, pushModal } from '../store/modal/modalSlice'
const useModal = () => {
  // const modalStack = useSelector((state: RootState) => state.modal.modalStack)
  // const dispatch = useDispatch<AppDispatch>()
  // const showModal = (modalState: ModalStack) => dispatch(pushModal(modalState))
  // const deleteModal = () => dispatch(closeModal())
  const modalStack = useContext(ModalStateContext)
  const setModalState = useContext(ModalSetterContext)
  if (!setModalState) {
    throw new Error('MyConsumer must be used within a MyProvider')
  }

  const showModal = (modalState: ModalStack) => setModalState((prev) => [...prev, modalState])
  const deleteModal = () => setModalState((prev) => [...prev.slice(1)])
  return {
    modalStack,
    showModal,
    deleteModal,
  }
}

export { useModal }
