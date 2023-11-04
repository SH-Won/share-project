'use client'

import { useModal } from '@/hooks'
import UploadProject from './upload/UploadProject'
const Navbar = () => {
  const { showModal } = useModal()
  const onClick = () => {
    showModal({
      type: 'bottomModal',
      component: () => <UploadProject />,
      props: '',
    })
  }
  return (
    <nav className="flex justify-between items-center h-[64px] px-[20px]">
      <div>logo</div>
      <div onClick={onClick}>Create</div>
    </nav>
  )
}

export default Navbar
