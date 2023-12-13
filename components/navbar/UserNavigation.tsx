'use client'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import UserImage from '../user/UserImage'
import { useRouter } from 'next/navigation'
import { useCloseEvent } from '@/hooks'

const items = [
  {
    key: 'upload',
    name: '프로젝트 업로드',
    href: '/upload',
  },
  {
    key: 'favorite',
    name: '좋아요',
    href: '/user/favorite',
  },
  {
    key: 'clipping',
    name: '스크랩',
    href: '/user/clipping',
  },
]
const getItems = (userId: string) => {
  return [
    {
      key: 'upload',
      name: '프로젝트 업로드',
      href: '/upload',
    },
    {
      key: 'favorite',
      name: '좋아요',
      href: `/${userId}/favorite`,
    },
    {
      key: 'clipping',
      name: '스크랩',
      href: `/${userId}/clipping`,
    },
  ]
}
interface Props {
  userId?: string
  userName: string
  userImageUrl: string
}
const UserNavigation = ({ userId, userName, userImageUrl }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleNavigation = () => setOpen((prev) => !prev)
  const { container } = useCloseEvent<HTMLDivElement>({
    callback: () => {
      setOpen(false)
    },
  })
  useEffect(() => {
    if (open) {
      document.querySelector('body')!.style.overflow = 'hidden'
    } else {
      document.querySelector('body')?.style.removeProperty('overflow')
    }
  }, [open])
  const handleSignOut = async () => {
    setOpen(false)
    signOut({
      redirect: false,
      callbackUrl: '/',
    }).then((response) => {
      router.push(response.url)
    })
  }
  return (
    <>
      <div onClick={handleNavigation}>
        <UserImage size={36} imageUrl={userImageUrl} />
      </div>
      <div className={`navbar__navigation-wrapper ${open ? 'open' : ''}`} ref={container}>
        <div className="user-navigation">
          <div className="user">
            <Link href={`/${userId}/work`} onClick={handleNavigation}>
              <UserImage size={80} imageUrl={userImageUrl} />
            </Link>
            <span className="user__name">{userName}</span>
          </div>
          <ul className="list">
            {getItems(userId!).map((item) => (
              <li key={item.key} className="item">
                <Link href={item.href} onClick={handleNavigation}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="item logout">
              <span onClick={handleSignOut}>로그아웃</span>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="overlay">

      </div> */}
    </>
  )
}

export default UserNavigation
