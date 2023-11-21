'use client'
import UserItemList from '@/components/user/UserItemList'
import Image from 'next/image'
import { useUserInventory } from '@/hooks'
import { useEffect } from 'react'
const UserActivityPage = () => {
  const { userFavoriteProjects, userClippingProjects } = useUserInventory()

  return (
    <div>
      <UserItemList
        title="좋아요 표시한 프로젝트"
        totalCount={userFavoriteProjects.length}
        icon={<Image src="/favorite.svg" width={24} height={24} alt="favorite-icon" />}
        // icon={
        //   <div style={{ width: '24px', height: '24px', flexShrink: '0' }}>
        //     <FavoriteSVG selected={true} />
        //   </div>
        // }
      >
        {userFavoriteProjects.renderList}
      </UserItemList>
      <UserItemList
        title="스크랩한 프로젝트"
        totalCount={userClippingProjects.length}
        icon={<Image src="/clipping.svg" width={24} height={24} alt="favorite-icon" />}
        // icon={
        //   <div style={{ width: '24px', height: '24px', flexShrink: '0' }}>
        //     <FavoriteSVG selected={true} />
        //   </div>
        // }
      >
        {userClippingProjects.renderList}
      </UserItemList>
    </div>
  )
}

export default UserActivityPage
