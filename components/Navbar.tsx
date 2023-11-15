'use client'
import { useModal } from '@/hooks'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from './common/Button'
import UploadProject from './upload/UploadProject'
// import UploadProject from './upload/UploadProject'
const Navbar = () => {
  const { showModal } = useModal()
  const router = useRouter()
  // const { data } = useSession()
  // console.log(data)

  // const onClick = () => {
  //   showModal({
  //     type: 'bottomSheet',
  //     Component: UploadProject,
  //     props: {},
  //   })
  // }
  return (
    <nav className="navbar">
      <div>logo</div>
      <Link href="/modal" shallow={true}>
        <div>Create</div>
      </Link>
      <Link href="/signup">
        <Button size="medium" type="black" text="Sign up" />
      </Link>
    </nav>
  )
}

export default Navbar
