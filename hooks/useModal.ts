'use client'
import { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, ModalStack, pushModal } from '../store/modal/modalSlice'
const useModal = () => {
  const modalStack = useSelector((state: RootState) => state.modal.modalStack)
  const dispatch = useDispatch<AppDispatch>()
  const showModal = (modalState: ModalStack) => dispatch(pushModal(modalState))
  const deleteModal = () => dispatch(closeModal())

  return {
    modalStack,
    showModal,
    deleteModal,
  }
}

export { useModal }
