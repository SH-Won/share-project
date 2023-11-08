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

  console.log(searchParams.get('modal'), 'modal searchParams')
  const isModalOpen = searchParams.get('modal')
  // const RenderModal = () => {
  //   return modalStack.map((modalState, index) => {
  //     switch (modalState.type) {
  //       case 'bottomModal':
  //         return (
  //           <BottomModal close={deleteModal} key={index}>
  //             <modalState.component {...modalState.props} />
  //           </BottomModal>
  //         )
  //       default:
  //         return <></>
  //     }
  //   })
  // }
  const ModalLayout = useCallback(() => {}, [])

  console.log('modal')
  return (
    <React.Fragment>
      {/* {RenderModal()} */}
      <BottomModal close={() => router.back()}>
        <UploadProject />
      </BottomModal>
    </React.Fragment>
  )
}

export default Modal
