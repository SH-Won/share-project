// 'use client'
import ProjectCardSkeleton from '@/components/card/ProjectCardSkeleton'

const Loading = () => {
  return (
    <div className="page-container">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
    </div>
  )
}

export default Loading
