'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
  {
    id: 'work',
    name: '내 글',
    href: '/user/work',
  },
  {
    id: 'favorite',
    name: '좋아요',
    href: '/user/favorite',
  },
  {
    id: 'clipping',
    name: '스크랩',
    href: '/user/clipping',
  },
]
const useItems = (userId: string) => {
  const { data: session } = useSession()
  const isSessionUser = session?.id === userId
  const items = [
    {
      id: 'work',
      name: 'Work',
      href: `/${userId}/work`,
    },
    {
      id: 'favorite',
      name: 'Favorite',
      href: `/${userId}/favorite`,
    },
    {
      id: 'clipping',
      name: 'Clipping',
      href: `/${userId}/clipping`,
    },
  ]
  return isSessionUser ? items : items.slice(0, -1)
}
const ContentNavigation = () => {
  const pathname = usePathname()
  const currentPath = pathname.split('/').at(-1)
  const userId = pathname.split('/')[1]
  return (
    <div className="user-content-navigation">
      <ul className="content-list">
        {useItems(userId!).map((item) => (
          <li
            className={`content-list__item ${currentPath === item.id ? 'selected' : ''}`}
            key={item.id}
          >
            <Link href={item.href} prefetch={false}>
              <span className="label">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContentNavigation
