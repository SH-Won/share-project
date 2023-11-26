import Image from 'next/image'
import React, { createContext, useContext } from 'react'
import '@/styles/components/project-card.scss'
import Link from 'next/link'
import ImageWithSkeleton from '../image/ImageWithSkeleton'
import { FavoriteSVG } from '../user_action/Favorite'
import { IProject } from '@/app/page'
import { Card } from '../ui'
interface ProjectCardProps {
  project: IProject | Omit<IProject, 'writer'>
  children: React.ReactNode
}

const ProjectCardContext = createContext<IProject | Omit<IProject, 'writer'>>({} as IProject)
const CardImage = () => {
  const project = useContext(ProjectCardContext)
  return (
    <Link href={`/detail/${project._id}`}>
      {/* <div className="image-container main">
    <Image src={imageUrl} width={400} height={400} alt={description} />
  </div> */}
      <ImageWithSkeleton
        type="main"
        width={400}
        height={400}
        imageUrl={project.thumbnail.imageUrl ?? ''}
        alt={project.title ?? 'loading'}
      />
    </Link>
  )
}
const CardContent = () => {
  const project = useContext(ProjectCardContext)
  if (!('author' in project)) {
    throw new Error('Card content always need writer property')
  }
  return (
    <div className="project-card__explain">
      <div className="writer">
        <Image
          src={project.author.imageUrl || '/noImage.svg'}
          width={24}
          height={24}
          alt={project.author.name}
        />
        <span>{project.author.name || 'no writer'}</span>
      </div>
      <div className="user-actions">
        <FavoriteSVG selected={true} />
        <span className="favorite-count">{project.favoriteUsers.length}</span>
      </div>
    </div>
  )
}
const ProjectCard = ({ project, children }: ProjectCardProps) => {
  return (
    <ProjectCardContext.Provider value={project}>
      <Card.Project>{children}</Card.Project>
    </ProjectCardContext.Provider>
  )
}
ProjectCard.Image = CardImage
ProjectCard.Content = CardContent

export default ProjectCard
