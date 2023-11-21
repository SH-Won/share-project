'use client'
import { IProject } from '@/app/page'
import { useInterSection } from '@/hooks'
import Image from 'next/image'
import { useState } from 'react'
import Clipping from '../user_action/Clipping'
import Favorite from '../user_action/Favorite'

interface DetailHeaderProps {
  project: IProject
}
const DetailHeader = ({ project }: DetailHeaderProps) => {
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
          <Favorite project={project} />
          <Clipping project={project} />
        </div>
      </div>
    </>
  )
}

export default DetailHeader
