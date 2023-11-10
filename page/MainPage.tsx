'use client'
import Loading from '@/app/loading'
import { IProject } from '@/app/page'
import ProjectCard from '@/components/card/ProjectCard'
// import { useFetch } from '@/hooks'

interface Props {
  projects: IProject[]
}

const MainPage = ({ projects: serverProjects }: Props) => {
  // const { loading, projects } = useFetch()
  console.log('main page')
  // if (loading) return <Loading />
  return (
    <main className="page-container">
      {serverProjects.map((project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          title={project.title}
          imageUrl={project.imageUrl}
          description={project.description}
          writer={project.writer?.name ?? ''}
          writerImage={project.writer?.image ?? ''}
        />
      ))}
    </main>
  )
}

export default MainPage
