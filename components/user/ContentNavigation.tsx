'use client'
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
const ContentNavigation = () => {
  const pathname = usePathname()
  const currentPath = pathname.split('/').at(-1)
  return (
    <div className="user-content-navigation">
      <ul className="content-list">
        {items.map((item) => (
          <li
            className={`content-list__item ${currentPath === item.id ? 'selected' : ''}`}
            key={item.id}
          >
            <Link href={item.href}>
              <span className="label">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContentNavigation
