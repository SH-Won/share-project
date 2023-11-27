'use client'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import UserImage from '../user/UserImage'
import { useRouter } from 'next/navigation'

const items = [
  {
    key: 'upload',
    name: '프로젝트 업로드',
    href: '/upload',
  },
  {
    key: 'favorite_clipping',
    name: '좋아요,스크랩 목록',
    href: '/user/activity',
  },
  {
    key: 'setting',
    name: '설정',
    href: '/user/profile',
  },
]
interface Props {
  userName: string
  userImageUrl: string
}
const UserNavigation = ({ userName, userImageUrl }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleNavigation = () => setOpen((prev) => !prev)
  useEffect(() => {
    if (open) {
      document.querySelector('body')!.style.overflow = 'hidden'
    } else {
      document.querySelector('body')?.style.removeProperty('overflow')
    }
  }, [open])
  const handleSignOut = async () => {
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
      <div className={`user-navigation-wrapper ${open ? 'open' : ''}`}>
        <div className="user-navigation">
          <div className="user">
            <UserImage size={80} imageUrl={userImageUrl} />
            <span className="user__name">{userName}</span>
          </div>
          <ul className="list">
            {items.map((item) => (
              <li key={item.key} className="item" onClick={handleNavigation}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
            <li className="item logout" onClick={handleSignOut}>
              로그아웃
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default UserNavigation
