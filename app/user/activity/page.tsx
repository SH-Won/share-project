'use client'
import React from 'react'
import '@/styles/layout/user-activity.scss'
import UserItemList from '@/components/user/UserItemList'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Card } from '@/components/ui'
import ProjectCard from '@/components/card/ProjectCard'
const page = () => {
  const { favorites } = useSelector((state: RootState) => state.user)
  return (
    <>
      <UserItemList
        title="좋아요 표시한 프로젝트"
        totalCount={203}
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

export default page
