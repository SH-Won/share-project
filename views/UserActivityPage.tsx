'use client'
import UserItemList from '@/components/user/UserItemList'
import { useUserInventory } from '@/hooks'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const UserActivityPage = () => {
  const pathname = usePathname()
  const { userFavoriteProjects, userClippingProjects, userProjects } = useUserInventory()

  const listMapper = {
    favorite: userFavoriteProjects,
    clipping: userClippingProjects,
    work: userProjects,
  }
  const currentPathname = pathname.split('/').at(-1) as keyof typeof listMapper
  const prevPathname = useMemo(() => {
    return currentPathname
  }, [])
  const RenderItemList = useMemo(() => {
    if (!listMapper[currentPathname])
      return (
        <UserItemList
          title={listMapper[prevPathname].title}
          totalCount={listMapper[prevPathname].length}
          icon={listMapper[prevPathname].Icon}
        >
          {listMapper[prevPathname].renderList}
        </UserItemList>
      )
    return (
      <UserItemList
        title={listMapper[currentPathname].title}
        totalCount={listMapper[currentPathname].length}
        icon={listMapper[currentPathname].Icon}
      >
        {listMapper[currentPathname].renderList}
      </UserItemList>
    )
  }, [currentPathname, userFavoriteProjects, userClippingProjects, userProjects])
  return <>{RenderItemList}</>
}

export default UserActivityPage
