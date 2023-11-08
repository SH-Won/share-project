import Image from 'next/image'
import React from 'react'
import '@/styles/components/project-card.scss'
import Link from 'next/link'
interface ProjectCardProps {
  id: string
  writer: string
  writerImage: string
  title?: string
  description: string
  imageUrl: string
}
const ProjectCard = ({
  id,
  writer,
  title,
  description,
  imageUrl,
  writerImage,
}: ProjectCardProps) => {
  return (
    <div className="project-card">
      <Link href={`/detail/${id}`} shallow={true}>
        <div className="project-card__image-wrapper">
          <Image src={imageUrl} width={400} height={400} alt={description} />
        </div>
      </Link>
      <div className="project-card__explain">
        <div className="writer">
          <Image src={writerImage || '/noImage.svg'} width={24} height={24} alt={writer} />
          <span>{writer || 'no writer'}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
