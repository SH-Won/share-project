'use client'
import { IProject } from '@/app/page'
import ProjectCard from '@/components/card/ProjectCard'
// import { getData } from '@/lib/api'
import { useFetch } from '@/hooks'
import Loading from '@/components/loading'

interface Props {
  projects?: IProject[]
}

const MainPage = ({ projects: serverProjects }: Props) => {
  const { loading, projects } = useFetch()
  if (loading) return <Loading />
  // const projects = await getData()
  return (
    <section className="page-container">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          title={project.title}
          imageUrl={project.imageUrl}
          description={project.description}
          writer={project.writer?.name ?? ''}
          writerImage={project.writer?.image ?? ''}
          favoriteCount={project.favoriteUsers.length}
        />
      ))}
    </section>
  )
}

export default MainPage
