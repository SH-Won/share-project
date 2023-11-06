'use client'
import { useModal } from '@/hooks'
import React, { useCallback } from 'react'
import '@/styles/layout/modal.scss'
import BottomModal from './BottomModal'
import { useRouter, useSearchParams } from 'next/navigation'
import UploadProject from '../upload/UploadProject'

const Modal = () => {
  const { modalStack, deleteModal } = useModal()
  const searchParams = useSearchParams()
  const router = useRouter()
  console.log(searchParams.get('modal'), 'modal searchParams')
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
  if (!searchParams.get('modal')) {
    return null
  }
  const Component = (props) => <UploadProject {...props} />

  return (
    <React.Fragment>
      {/* {RenderModal()} */}
      <BottomModal close={() => router.back()}>
        <Component />
      </BottomModal>
    </React.Fragment>
  )
}

export default Modal
