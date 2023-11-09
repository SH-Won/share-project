'use client'
import ProjectCard from '@/components/card/ProjectCard'
import ProjectCardSkeleton from '@/components/card/ProjectCardSkeleton'
import { useEffect, useState } from 'react'
export interface IProject {
  _id: string
  title: string
  description: string
  imageUrl: string
  writer: {
    _id: string
    image: string
    name: string
  }
}
const getData = async () => {
  const response = await fetch('http://localhost:3000/api/', {})
  if (!response.ok) {
    return []
  }
  const products = (await response.json()).products
  return (products as IProject[]) || []
}

export default function Home() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getData().then(async (response) => {
      setProjects(response)
      setLoading(false)
    })
  }, [])
  if (loading)
    return (
      <div className="page-container">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
      </div>
    )

  return (
    <div className="page-container">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          title={project.title}
          imageUrl={project.imageUrl}
          description={project.description}
          writer={project.writer?.name ?? ''}
          writerImage={project.writer?.image ?? ''}
        />
      ))}
    </div>
  )
}
