'use client'
import '@/styles/layout/detail-page.scss'
import { IProject } from '@/app/page'
import Intro from '@/components/detail/Intro'
import SkeletonDetail from '@/components/detail/SkeletonDetail'
import { useEffect, useState } from 'react'

interface Props {
  params: {
    id: string
  }
}
const DetailPage = ({ params }: Props) => {
  const id = params!.id
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState<IProject>()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
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
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [id])

  if (loading) return <SkeletonDetail />

  return (
    <div className="detail-page">
      <Intro project={project!} />
      <div style={{ height: '150vh' }}></div>
    </div>
  )
}

export default DetailPage
