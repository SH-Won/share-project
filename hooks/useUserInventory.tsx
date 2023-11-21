'use client'
import ProjectCard from '@/components/card/ProjectCard'
import Loading from '@/components/loading'
import { RootState } from '@/store'
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
  const { loading, favorites, clippings } = useSelector((state: RootState) => state.user)
  // const { breakPointsClass } = useBreakPoints()
  // console.log(breakPointsClass)
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
          <Loading count={5} />
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
          <Loading count={5} />
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
  return {
    loading,
    userFavoriteProjects: {
      length: userFavoriteProjects.length,
      renderList: userFavoriteItemList,
    },
    userClippingProjects: {
      length: userClippingProjects.length,
      renderList: userClippingItemList,
    },
  }
}

export { useUserInventory }
