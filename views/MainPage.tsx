'use client'
import { IProject } from '@/app/page'
import ProjectCard from '@/components/card/ProjectCard'
import { getData } from '@/lib/api'
import { useFetch, useInfinityScroll, useInterSection } from '@/hooks'
import Loading from '@/components/loading'
import React, { Suspense, useCallback, useState } from 'react'
import ErrorNotification from '@/components/common/ErrorNotification'

interface Props {
  projects?: IProject[]
}

const MainPage = ({ projects: serverProjects }: Props) => {
  const { loading, hasMore, projects, loadMore, error, refresh } = useFetch()

  const { targetRef } = useInfinityScroll<HTMLDivElement>({
    loading,
    hasMore,
    error,
    callback: loadMore,
  })
  return (
    <>
      <section className="page-container">
        {projects!.map((project) => (
          <div key={project._id}>
            <ProjectCard project={project}>
              <ProjectCard.Image />
              <ProjectCard.Content />
            </ProjectCard>
          </div>
        ))}
        {loading && <Loading />}
        <div ref={targetRef}></div>
      </section>
      {error && <ErrorNotification onClick={refresh} />}
    </>
  )
}

export default MainPage
