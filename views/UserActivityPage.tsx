'use client'
import React from 'react'
import UserItemList from '@/components/user/UserItemList'
import Image from 'next/image'
import ProjectCard from '@/components/card/ProjectCard'
import { useUserInventory } from '@/hooks'
const UserActivityPage = () => {
  const { favorites } = useUserInventory()
  return (
    <>
      <UserItemList
        title="좋아요 표시한 프로젝트"
        totalCount={Object.keys(favorites).length}
        icon={<Image src="/favorite.svg" width={24} height={24} alt="favorite-icon" />}
      >
        {Object.values(favorites).map((item) => (
          <ProjectCard project={item} key={item._id}>
            <ProjectCard.Image />
            <ProjectCard.Content />
          </ProjectCard>
        ))}
      </UserItemList>
    </>
  )
}

export default UserActivityPage
