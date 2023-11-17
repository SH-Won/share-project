'use client'
import { IProject } from '@/app/page'
import ProjectCard from '@/components/card/ProjectCard'
import { getData } from '@/lib/api'
import { useFetch, useInfinityScroll, useInterSection } from '@/hooks'
import Loading from '@/components/loading'
import React, { Suspense, useCallback, useState } from 'react'

interface Props {
  projects?: IProject[]
}

const MainPage = ({ projects: serverProjects }: Props) => {
  const { loading, projects, loadMore } = useFetch()

  const { targetRef } = useInfinityScroll<HTMLDivElement>({
    loading,
    hasMore: true,
    callback: loadMore,
  })
  if (loading) return <Loading />
  return (
    <section className="page-container">
      {projects!.map((project) => (
        <div key={project._id}>
          <ProjectCard project={project}>
            <ProjectCard.Image />
            <ProjectCard.Content />
          </ProjectCard>
        </div>
      ))}

      {/* {loading ? <Loading /> : <div ref={targetRef} style={{ height: '10px' }}></div>} */}
    </section>
  )
}

export default MainPage
