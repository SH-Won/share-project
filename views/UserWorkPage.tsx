'use client'
import ProjectCard from '@/components/card/ProjectCard'
import ErrorNotification from '@/components/common/ErrorNotification'
import Loading from '@/components/loading'
import UserItemList from '@/components/user/UserItemList'
import { useInfinityFetch } from '@/hooks'
import BackEnd from '@/lib/network'
import { IProject } from '@/lib/network/types/project'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
const UserWorkPage = () => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const userId = pathname.split('/')[1]
  const isSessionUser = session?.id === userId
  const { targetRef, loading, error, data, refresh, totalLength } = useInfinityFetch<
    IProject,
    HTMLDivElement
  >({
    fetchFunc: BackEnd.getInstance().user.getUserProjects,
  })

  return (
    <div>
      <UserItemList
        icon={<Image src="/success.svg" width={24} height={24} alt="clipping-icon" />}
        title="작성한 프로젝트"
        totalCount={totalLength}
      >
        {data.map((el) => (
          <ProjectCard project={el} key={el._id}>
            <ProjectCard.Image />
            {!isSessionUser && (
              <ProjectCard.UserController>
                <ProjectCard.ControllFavorite />
                <ProjectCard.ControllClipping />
              </ProjectCard.UserController>
            )}
          </ProjectCard>
        ))}
        {loading && <Loading count={6} />}
        <div ref={targetRef}></div>
        {error && <ErrorNotification onClick={refresh} />}
      </UserItemList>
    </div>
  )
}

export default UserWorkPage
