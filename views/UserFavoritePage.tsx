'use client'
import ProjectCard from '@/components/card/ProjectCard'
import ErrorNotification from '@/components/common/ErrorNotification'
import Loading from '@/components/loading'
import UserItemList from '@/components/user/UserItemList'
import { useInfinityFetch } from '@/hooks'
import BackEnd from '@/lib/network'
import { IProject } from '@/lib/network/types/project'
import Image from 'next/image'
import React from 'react'

const UserFavoritePage = () => {
  const { targetRef, loading, error, data, refresh } = useInfinityFetch<IProject, HTMLDivElement>({
    fetchFunc: BackEnd.getInstance().user.getUserFavorites,
  })
  return (
    <div>
      <UserItemList
        icon={<Image src="/favorite.svg" width={24} height={24} alt="favorite-icon" />}
        title="좋아요 표시한 프로젝트"
        totalCount={5}
      >
        {data.map((el) => (
          <ProjectCard project={el} key={el._id}>
            <ProjectCard.Image />
            <ProjectCard.Content />
          </ProjectCard>
        ))}
        {loading && <Loading count={2} />}
        <div ref={targetRef}></div>
        {error && <ErrorNotification onClick={refresh} />}
      </UserItemList>
    </div>
  )
}

export default UserFavoritePage
