'use client'
import { useInterSection } from '@/hooks'
import { IProjectDetailResponse } from '@/lib/network/types/project'
import Image from 'next/image'
import { useState } from 'react'
import Clipping from '../user_action/Clipping'
import Favorite from '../user_action/Favorite'

interface DetailHeaderProps extends Omit<IProjectDetailResponse, 'writerProjects'> {}
const DetailHeader = ({ project, isUserFavorite, isUserClipping }: DetailHeaderProps) => {
  const [isBottomBorder, setIsBottomBorder] = useState(false)
  const { targetRef } = useInterSection<HTMLHeadingElement>({
    // callback: (bool: boolean) => setIsBottomBorder(bool),
    handleInterSecting: ([entry], ob) => {
      if (entry.isIntersecting) {
        setIsBottomBorder(false)
      } else {
        setIsBottomBorder(true)
      }
    },
    option: {
      threshold: 0,
    },
  })
  return (
    <>
      <h1 ref={targetRef} className="detail-header__title">
        {project.title}
      </h1>
      <div className={`detail-header sticky ${isBottomBorder ? 'sticky-start' : ''}`}>
        <div className="detail-header__user-content">
          <div className="user-image">
            <Image
              src={project.author?.imageUrl || '/noImage.svg'}
              width={48}
              height={48}
              alt={project.author?.name}
            />
          </div>
          <div className="user-content-container">
            <span className="user-name">{project.author?.name}</span>
            <span className="user-status">Good</span>
          </div>
        </div>
        <div className="detail-header__user-actions">
          <Favorite isUserFavorite={isUserFavorite} projectId={project._id} />
          <Clipping isUserClipping={isUserClipping} projectId={project._id} />
        </div>
      </div>
    </>
  )
}

export default DetailHeader
