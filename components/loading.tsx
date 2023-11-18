// 'use client'
import ProjectCardSkeleton from '@/components/card/ProjectCardSkeleton'

const Loading = ({ count }: { count?: number }) => {
  return (
    <>
      {Array(count || 10)
        .fill(0)
        .map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
    </>
  )
}

export default Loading
