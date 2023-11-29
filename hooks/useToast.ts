'use client'
import { AppDispatch, RootState } from '@/store'
import { addToast, IToastItem, popToast } from '@/store/toast/toastSlice'
import { useDispatch, useSelector } from 'react-redux'

const useToast = () => {
  const { toastItems } = useSelector((state: RootState) => state.toast)
  const dispatch = useDispatch<AppDispatch>()
  const showToast = (toast: Omit<IToastItem, 'id'>) => {
    dispatch(addToast({ ...toast, id: crypto.randomUUID() }))
  }
  const removeToast = () => {
    dispatch(popToast())
  }

  return {
    toastItems,
    showToast,
    removeToast,
  }
}

export { useToast }
