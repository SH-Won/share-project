'use client'
import { useModal } from '@/hooks'
import React, { useCallback } from 'react'
import BottomModal from './BottomModal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import UploadProject from '../upload/UploadProject'

const Modal = () => {
  // const { modalStack, deleteModal } = useModal()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  console.log(searchParams!.get('modal'), 'modal searchParams')
  const isModalOpen = searchParams!.get('modal')
  const ModalLayout = useCallback(() => {}, [])

  return (
    <BottomModal>
      <UploadProject />
    </BottomModal>
  )
}

export default Modal
