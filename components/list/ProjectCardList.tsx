'use client'
import { useFetch, useInfinityScroll } from '@/hooks'
import React from 'react'
import ProjectCard from '../card/ProjectCard'
import ErrorNotification from '../error/ErrorNotification'
import Loading from '../loading'

const ProjectCardList = () => {
  const { loading, hasMore, projects, loadMore, error, refresh, limit } = useFetch()

  const { targetRef } = useInfinityScroll<HTMLDivElement>({
    loading,
    hasMore,
    error,
    callback: loadMore,
  })
  return (
    <>
      {projects &&
        projects!.map((project) => (
          <div key={project._id}>
            <ProjectCard project={project}>
              <ProjectCard.Image />
              <ProjectCard.Content />
            </ProjectCard>
          </div>
        ))}
      {loading && <Loading count={8} />}

      {!error ? <div ref={targetRef}></div> : <ErrorNotification onClick={refresh} />}
    </>
  )
}

export default ProjectCardList
