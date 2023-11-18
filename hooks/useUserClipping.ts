'use client'

import { IProject } from '@/app/page'
import { useSelectState, useModal } from '@/hooks'
import { useSession } from 'next-auth/react'

const useUserClipping = (project: IProject) => {
  // const {data : session} = useSession()
  // const {showModal} = useModal()
  // const {
  //   selected: clippingSelected,
  //   disabled: clippingDisable,
  //   setSelected: setClippingSelected,
  //   setDisabled: setClippingDisabled,
  // } = useSelectState({ isSelected: favorites[project._id] ? true : false, isDisable: false })
  // const updateClipping = async () => {
  //   if (!session?.id) {
  //     showModal({
  //       type: 'basic',
  //       Component: Signup,
  //       props: {},
  //     })
  //     return
  //   }
  //   setClippingSelected((prev) => !prev)
  //   setClippingDisabled(true)
  //   updateUserClipping({
  //     projectId: project._id,
  //     userId: session.id,
  //     isAdd,
  //   })
  // }
}

export { useUserClipping }
