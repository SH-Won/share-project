import Image from 'next/image'
import React, { createContext, useContext, useState } from 'react'
import '@/styles/components/project-card.scss'
import Link from 'next/link'
import ImageWithSkeleton from '../image/ImageWithSkeleton'
import FavoriteButton, { FavoriteSVG } from '../user_action/Favorite'
import { Card } from '../ui'
import { IProject } from '@/lib/network/types/project'
import { useClipping, useCloseEvent, useFavorite } from '@/hooks'
import Clipping, { ClippingSVG } from '../user_action/Clipping'
interface ProjectCardProps {
  project: IProject | Omit<IProject, 'writer'>
  children: React.ReactNode
}

const ClipSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      role="img"
      className="icon fill-current"
    >
      <circle cx="2" cy="8" r="1.5" fill="currentColor"></circle>
      <circle cx="14" cy="8" r="1.5" fill="currentColor"></circle>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"></circle>
    </svg>
  )
}
const ProjectCardContext = createContext<IProject | Omit<IProject, 'writer'>>({} as IProject)
const CardImage = () => {
  const project = useContext(ProjectCardContext)
  return (
    <Link href={`/detail/${project._id}`} prefetch={false}>
      {/* <div className="image-container main">
        <Image
          src={project.thumbnail.imageUrl || '/noImage.svg'}
          width={400}
          height={400}
          alt={project.title}
        />
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
const CardAuthor = ({ imageUrl, name }: { [key: string]: string }) => {
  return (
    <div className="writer">
      <Image src={imageUrl || '/noImage.svg'} width={24} height={24} alt={name} />
      <span>{name || 'no writer'}</span>
    </div>
  )
}
const ClearFavorite = ({ update }: { update: () => void }) => {
  const project = useContext(ProjectCardContext)
  const [open, setOpen] = useState(false)
  const { updateFavorite } = useFavorite(project._id, project.isUserFavorite!)

  const onClick = (e: React.MouseEvent) => {
    updateFavorite(e).then((response) => {
      if (response) {
        update()
      }
    })
  }
  return (
    <div className="clear-actions">
      <div className="icon-wrapper" onClick={() => setOpen((prev) => !prev)}>
        <ClipSVG />
      </div>
      {open && (
        <div className="clear-actions__content">
          <div className="item" onClick={onClick}>
            <FavoriteSVG selected={false} />
            <span>좋아요 해제</span>
          </div>
          <div className="overlay" onClick={() => setOpen(false)}></div>
        </div>
      )}
    </div>
  )
}
const ControllFavorite = () => {
  const project = useContext(ProjectCardContext)
  return <FavoriteButton isUserFavorite={project.isUserFavorite!} projectId={project._id} />
}
const ControllClipping = () => {
  const project = useContext(ProjectCardContext)
  return <Clipping isUserClipping={project.isUserClipping!} projectId={project._id} />
}
const ControllHideProject = () => {
  const project = useContext(ProjectCardContext)
}
const ClearClipping = ({ update }: { update: () => void }) => {
  const project = useContext(ProjectCardContext)
  const [open, setOpen] = useState(false)
  const { updateClipping } = useClipping(project._id, true)

  const onClick = (e: React.MouseEvent) => {
    updateClipping(e).then((response) => {
      if (response) {
        update()
      }
    })
  }
  return (
    <div className="clear-actions">
      <div className="icon-wrapper" onClick={() => setOpen((prev) => !prev)}>
        <ClipSVG />
      </div>
      {open && (
        <div className="clear-actions__content">
          <div className="item" onClick={onClick}>
            <ClippingSVG selected={false} />
            <span>스크랩 해제</span>
          </div>
        </div>
      )}
    </div>
  )
}
const CardContent = () => {
  const project = useContext(ProjectCardContext)
  if (!('author' in project)) {
    throw new Error('Card content always need writer property')
  }
  return (
    <div className="project-card__explain">
      <CardAuthor imageUrl={project.author.imageUrl} name={project.author.name} />
      <div className="user-actions">
        <FavoriteSVG selected={true} />
        <span className="favorite-count">{project.favoriteCount}</span>
      </div>
    </div>
  )
}
const CardUserController = ({ children }: { children: React.ReactNode }) => {
  const project = useContext(ProjectCardContext)
  if (!('author' in project)) {
    throw new Error('Card content always need writer property')
  }
  return (
    <div className="project-card__explain">
      <CardAuthor imageUrl={project.author.imageUrl} name={project.author.name} />
      <div className="user-controller">{children}</div>
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
ProjectCard.UserController = CardUserController
ProjectCard.ClearFavorite = ClearFavorite
ProjectCard.ClearClipping = ClearClipping
ProjectCard.ControllFavorite = ControllFavorite
ProjectCard.ControllClipping = ControllClipping

export default ProjectCard
