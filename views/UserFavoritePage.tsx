'use client'
import ProjectCard from '@/components/card/ProjectCard'
import ErrorNotification from '@/components/common/ErrorNotification'
import Loading from '@/components/loading'
import UserItemList from '@/components/user/UserItemList'
import { useInfinityFetch } from '@/hooks'
import { getUserFavoriteProjects } from '@/lib/actions'
import BackEnd from '@/lib/network'
import { IProject } from '@/lib/network/types/project'
import Image from 'next/image'
import React from 'react'

const UserFavoritePage = ({
  isSessionUser,
  projects,
  projectLength,
}: {
  isSessionUser: boolean
  projects?: IProject[]
  projectLength?: number
}) => {
  // const hasMore = projects.length < projectLength
  // const { targetRef, loading, error, data, refresh, updateData } = useInfinityFetch<
  //   IProject,
  //   HTMLDivElement
  // >({
  //   initialState: projects,
  //   hasMore,
  //   fetchFunc: getUserFavoriteProjects,
  // })
  const { targetRef, loading, error, data, refresh, updateData, totalLength } = useInfinityFetch<
    IProject,
    HTMLDivElement
  >({
    fetchFunc: BackEnd.getInstance().user.getUserFavorites,
  })

  return (
    <div>
      <UserItemList
        icon={<Image src="/favorite.svg" width={24} height={24} alt="favorite-icon" />}
        title="좋아요 표시한 프로젝트"
        totalCount={totalLength}
      >
        {data.map((el, index) => (
          <ProjectCard project={el} key={el._id}>
            <ProjectCard.Image />
            <ProjectCard.UserController>
              {isSessionUser ? (
                <ProjectCard.ClearFavorite update={() => updateData(index)} />
              ) : (
                <ProjectCard.ControllFavorite />
              )}
            </ProjectCard.UserController>
          </ProjectCard>
        ))}
        {loading && <Loading count={6} />}
        <div ref={targetRef}></div>
        {error && <ErrorNotification onClick={refresh} />}
      </UserItemList>
    </div>
  )
}

export default UserFavoritePage
