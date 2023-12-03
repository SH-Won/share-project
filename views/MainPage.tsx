'use client'
import ProjectCard from '@/components/card/ProjectCard'
// import { getData } from '@/lib/api'
import { useFetch, useInfinityScroll, useInterSection } from '@/hooks'
import Loading from '@/components/loading'
import React, { Suspense, useCallback, useState } from 'react'
import ErrorNotification from '@/components/common/ErrorNotification'
import ProjectCardList from '@/components/list/ProjectCardList'
import { IProject } from '@/lib/network/types/project'

interface Props {
  projects?: IProject[]
}

function MainPage({ projects: serverProjects }: Props) {
  // const { loading, hasMore, projects, loadMore, error, refresh } = useFetch()

  // const { targetRef } = useInfinityScroll<HTMLDivElement>({
  //   loading,
  //   hasMore,
  //   error,
  //   callback: loadMore,
  // })
  return (
    <>
      <section className="page-container">
        {/* {serverProjects &&
          serverProjects!.map((project) => (
            <div key={project._id}>
              <ProjectCard project={project}>
                <ProjectCard.Image />
                <ProjectCard.Content />
              </ProjectCard>
            </div>
          ))} */}
        {/* {loading && <Loading />}
        <div ref={targetRef}></div> */}
        <ProjectCardList />
      </section>
    </>
  )
}

export default MainPage
