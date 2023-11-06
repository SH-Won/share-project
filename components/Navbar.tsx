'use client'
import { useModal } from '@/hooks'
import { useRouter } from 'next/navigation'
import UploadProject from './upload/UploadProject'
const Navbar = () => {
  const { showModal } = useModal()
  const router = useRouter()
  const onClick = () => {
    // router.push('#create')
    // history.pushState(null, '', location.href)
    router.push('?modal=true')
    // showModal({
    //   type: 'bottomModal',
    //   component: (props) => <UploadProject {...props} />,
    //   props: '',
    // })
  }
  return (
    <nav className="flex justify-between items-center h-[64px] px-[20px]">
      <div>logo</div>
      <div onClick={onClick}>Create</div>
    </nav>
  )
}

export default Navbar
