'use client'
import { useInterSection } from '@/hooks'
import { IProjectDetailResponse } from '@/lib/network/types/project'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import UserImage from '../user/UserImage'
import Clipping from '../user_action/Clipping'
import Favorite from '../user_action/Favorite'

interface DetailHeaderProps extends Omit<IProjectDetailResponse, 'writerProjects'> {}
const DetailHeader = ({ project }: DetailHeaderProps) => {
  const router = useRouter()
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
  const goUserPage = () => {
    router.push(`/${project.author._id}/work`)
  }
  return (
    <>
      <h1 ref={targetRef} className="detail-header__title">
        {project.title}
      </h1>
      <div className={`detail-header sticky ${isBottomBorder ? 'sticky-start' : ''}`}>
        <div className="detail-header__user-content">
          <div className="user-image" onClick={goUserPage}>
            {/* <Image
              src={project.author?.imageUrl || '/noImage.svg'}
              width={48}
              height={48}
              alt={project.author?.name}
            /> */}
            <UserImage imageUrl={project.author.imageUrl} size={48} />
          </div>
          <div className="user-content-container">
            <span className="user-name">{project.author?.name}</span>
            <span className="user-status">Good</span>
          </div>
        </div>
        <div className="detail-header__user-actions">
          <Favorite isUserFavorite={project.isUserFavorite} projectId={project._id} />
          <Clipping isUserClipping={project.isUserClipping} projectId={project._id} />
        </div>
      </div>
    </>
  )
}

export default DetailHeader
