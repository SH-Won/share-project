'use client'

import { IProject } from '@/app/page'
import Skeleton from '@/components/common/Skeleton'
import DetailPage from '@/components/detail/DetailPage'
import SkeletonDetail from '@/components/detail/SkeletonDetail'
import { useEffect, useState } from 'react'

interface Props {
  params: {
    id: string
  }
}
const Page = ({ params }: Props) => {
  const { id } = params
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState<IProject>()

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`http://localhost:3000/api/detail/${id}`, {
        method: 'GET',
      })
      if (response.ok) {
        const json = await response.json()
        console.log(json)
        setProject(json.project)
        setLoading(false)
      } else {
      }
    })()
  }, [id])
  console.log(project)

  if (loading) return <SkeletonDetail />

  return (
    <div>
      <DetailPage project={project!} />
      <div style={{ height: '150vh' }}></div>
    </div>
  )
}

export default Page
