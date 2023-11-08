import { IProject } from '@/app/page'
import Image from 'next/image'
import React from 'react'
import ImageWithSkeleton from '../image/ImageWithSkeleton'
import Close from '../modal/Close'
interface Props {
  project: IProject
}
const DetailPage = ({ project }: Props) => {
  return (
    <div className="detail-container">
      <Close />
      <h1 className="detail-header__title">{project.title}</h1>
      <div className="detail-header sticky">
        <div className="detail-header__user-content">
          <div className="user-image">
            <Image
              src={project.writer?.image || '/noImage.svg'}
              width={32}
              height={32}
              alt={project.writer?.name}
            />
          </div>
          <div className="user-content-container">
            <span className="user-name">{project.writer?.name}</span>
            <span className="user-status">Good</span>
          </div>
        </div>
      </div>
      <ImageWithSkeleton type="detail" imageUrl={project.imageUrl} alt={project.title} />
      <p className="detail-content__overview"></p>
    </div>
  )
}

export default DetailPage
