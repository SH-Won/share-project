'use client'
import ProjectCard from '@/components/card/ProjectCard'
import Loading from '@/components/loading'
import { RootState } from '@/store'
import Image from 'next/image'
import { ClassType, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { TScreenState, useBreakPoints } from './useBreakPoints'
const count: Record<TScreenState, number> = {
  desktop: 5,
  tablet: 4,
  mobile: 2,
  '': 0,
}
const useUserInventory = () => {
  const { loading, favorites, clippings, projects } = useSelector((state: RootState) => state.user)
  const favoritesLength = useMemo(() => {
    return Object.keys(favorites).length
  }, [favorites])
  const clipingsLength = useMemo(() => {
    return Object.keys(clippings).length
  }, [clippings])
  const userFavoriteProjects = useMemo(() => {
    return Object.values(favorites)
  }, [favorites])
  const userClippingProjects = useMemo(() => {
    return Object.values(clippings)
  }, [clippings])

  const userFavoriteItemList = useMemo(() => {
    return (
      <>
        {loading ? (
          <Loading count={3} />
        ) : (
          userFavoriteProjects.map((item) => (
            <ProjectCard project={item} key={item._id}>
              <ProjectCard.Image />
              <ProjectCard.Content />
            </ProjectCard>
          ))
        )}
      </>
    )
  }, [loading, userFavoriteProjects])
  const userClippingItemList = useMemo(() => {
    return (
      <>
        {loading ? (
          <Loading count={3} />
        ) : (
          userClippingProjects.map((item) => (
            <ProjectCard project={item} key={item._id}>
              <ProjectCard.Image />
              <ProjectCard.Content />
            </ProjectCard>
          ))
        )}
      </>
    )
  }, [loading, userClippingProjects])
  const userProjectsItemList = useMemo(() => {
    return (
      <>
        {loading ? (
          <Loading count={5} />
        ) : (
          projects.map((item) => (
            <ProjectCard project={item} key={item._id}>
              <ProjectCard.Image />
            </ProjectCard>
          ))
        )}
      </>
    )
  }, [projects, loading])
  return {
    loading,
    userFavoriteProjects: {
      Icon: <Image src="/favorite.svg" width={24} height={24} alt="favorite-icon" />,
      title: '좋아요 표시한 프로젝트',
      length: userFavoriteProjects.length,
      renderList: userFavoriteItemList,
    },
    userClippingProjects: {
      Icon: <Image src="/clipping.svg" width={24} height={24} alt="clipping-icon" />,
      title: '스크랩한 프로젝트',
      length: userClippingProjects.length,
      renderList: userClippingItemList,
    },
    userProjects: {
      Icon: <Image src="/success.svg" width={24} height={24} alt="clipping-icon" />,
      title: '작성한 프로젝트',
      renderList: userProjectsItemList,
      length: projects.length,
    },
  }
}

export { useUserInventory }
