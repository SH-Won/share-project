'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navigationItems = [
  {
    id: 'profile',
    name: '프로필',
    href: '/user/profile',
  },
  {
    id: 'activity',
    name: '내 활동',
    href: '/user/activity',
  },
]
type UserNavigationProps = {
  slug: string[]
}
const UserNavigation = () => {
  const pathname = usePathname()
  const currentMathPath = pathname.split('/')[2]
  return (
    <div className="user-navigation">
      <ul className="navi-list">
        {navigationItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <li className={`navi-list__item ${currentMathPath === item.id ? 'selected' : ''}`}>
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default UserNavigation
