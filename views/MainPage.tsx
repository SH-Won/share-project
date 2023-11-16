'use client'
import { IProject } from '@/app/page'
import ProjectCard from '@/components/card/ProjectCard'
import { getData } from '@/lib/api'
import { useFetch } from '@/hooks'
import Loading from '@/components/loading'
import { Suspense } from 'react'

interface Props {
  projects?: IProject[]
}

const MainPage = ({ projects: serverProjects }: Props) => {
  const { loading, projects } = useFetch()
  if (loading) return <Loading />
  return (
    <section className="page-container">
      {projects!.map((project) => (
        <ProjectCard project={project} key={project._id}>
          <ProjectCard.Image />
          <ProjectCard.Content />
        </ProjectCard>
      ))}
    </section>
  )
}

export default MainPage
