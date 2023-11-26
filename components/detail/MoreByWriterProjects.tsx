import { IProject } from '@/app/page'
import React from 'react'
import ProjectCard from '../card/ProjectCard'

interface Props {
  projects: Omit<IProject, 'writer'>[]
  writerName: string
}
const MoreByWriterProjects = ({ projects, writerName }: Props) => {
  return (
    <div className="more-by-writer-section">
      <h2 className="heading">More by {writerName} </h2>
      <div className="more-by-project-container">
        {projects.map((project) => (
          <ProjectCard project={project} key={'more_by_' + project._id}>
            <ProjectCard.Image />
          </ProjectCard>
        ))}
      </div>
    </div>
  )
}

export default MoreByWriterProjects
