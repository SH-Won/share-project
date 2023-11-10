import { IProject } from '@/app/page'
import React from 'react'
import ProjectCard from '../card/ProjectCard'

interface Props {
  relativeProjects: Omit<IProject, 'writer'>[]
  writer: IProject['writer']
}
const RelativeProjects = ({ relativeProjects, writer }: Props) => {
  return (
    <div className="relative-project-container">
      {relativeProjects.map((project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          title={project.title}
          imageUrl={project.imageUrl}
          description={project.description}
          writer={writer?.name ?? ''}
          writerImage={writer?.image ?? ''}
        />
      ))}
    </div>
  )
}

export default RelativeProjects
