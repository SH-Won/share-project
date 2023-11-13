import Image from 'next/image'
import React from 'react'
import '@/styles/components/project-card.scss'
import Link from 'next/link'
import ImageWithSkeleton from '../image/ImageWithSkeleton'
import { FavoriteSVG } from '../user_action/Favorite'
interface ProjectCardProps {
  id: string
  writer: string
  writerImage: string
  title?: string
  description: string
  imageUrl: string
  favoriteCount: number
}
const ProjectCard = ({
  id,
  writer,
  title,
  description,
  imageUrl,
  writerImage,
  favoriteCount,
}: ProjectCardProps) => {
  return (
    <div className="project-card">
      <Link href={`/detail/${id}`}>
        {/* <div className="image-container main">
          <Image src={imageUrl} width={400} height={400} alt={description} />
        </div> */}
        <ImageWithSkeleton
          type="main"
          width={400}
          height={400}
          imageUrl={imageUrl ?? ''}
          alt={title ?? 'loading'}
        />
      </Link>
      <div className="project-card__explain">
        <div className="writer">
          <Image src={writerImage || '/noImage.svg'} width={24} height={24} alt={writer} />
          <span>{writer || 'no writer'}</span>
        </div>
        <div className="user-actions">
          <FavoriteSVG selected={true} />
          <span className="favorite-count">{favoriteCount}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
