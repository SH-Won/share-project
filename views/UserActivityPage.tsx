'use client'
import UserItemList from '@/components/user/UserItemList'
import { useUserInventory } from '@/hooks'
import { usePathname } from 'next/navigation'

const UserActivityPage = () => {
  const pathname = usePathname()
  const { userFavoriteProjects, userClippingProjects, userProjects } = useUserInventory()

  const listMapper = {
    favorite: userFavoriteProjects,
    clipping: userClippingProjects,
    work: userProjects,
  }
  const currentPathname = pathname.split('/').at(-1) as keyof typeof listMapper
  return (
    <>
      <UserItemList
        title={listMapper[currentPathname].title}
        totalCount={listMapper[currentPathname].length}
        icon={listMapper[currentPathname].Icon}
      >
        {listMapper[currentPathname].renderList}
      </UserItemList>
    </>
  )
}

export default UserActivityPage
