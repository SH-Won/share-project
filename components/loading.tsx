// 'use client'
import ProjectCardSkeleton from '@/components/card/ProjectCardSkeleton'

const Loading = () => {
  return (
    <>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
    </>
  )
}

export default Loading
