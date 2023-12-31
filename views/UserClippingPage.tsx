'use client'
import ProjectCard from '@/components/card/ProjectCard'
import LoadingLings from '@/components/common/LoadingLings'
import ErrorNotification from '@/components/error/ErrorNotification'
import Loading from '@/components/loading'
import UserItemList from '@/components/user/UserItemList'
import { useInfinityFetch } from '@/hooks'
import { getUserClippingProjects } from '@/lib/actions'
import BackEnd from '@/lib/network'
import { IProject } from '@/lib/network/types/project'
import Image from 'next/image'
import React from 'react'

const UserClippingPage = ({
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
  //   fetchFunc: getUserClippingProjects,
  // })
  const { targetRef, loading, error, data, refresh, updateData, totalLength } = useInfinityFetch<
    IProject,
    HTMLDivElement
  >({
    fetchFunc: BackEnd.getInstance().user.getUserClipping,
  })
  return (
    <div>
      <UserItemList
        icon={<Image src="/clipping.svg" width={24} height={24} alt="clipping-icon" />}
        title="스크랩한 프로젝트"
        totalCount={totalLength}
      >
        {data.map((el, index) => (
          <ProjectCard project={el} key={el._id}>
            <ProjectCard.Image />
            <ProjectCard.UserController>
              <ProjectCard.ClearClipping update={() => updateData(index)} />
            </ProjectCard.UserController>
          </ProjectCard>
        ))}
        <div ref={targetRef}></div>
        {error && <ErrorNotification onClick={refresh} />}
      </UserItemList>
      {loading && <LoadingLings />}
    </div>
  )
}

export default UserClippingPage
