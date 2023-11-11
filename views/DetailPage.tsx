'use client'
import '@/styles/layout/detail-page.scss'
import { IProject } from '@/app/page'
import Intro from '@/components/detail/Intro'
import SkeletonDetail from '@/components/detail/SkeletonDetail'
import { useEffect, useState } from 'react'
import RelativeProjects from '@/components/detail/RelativeProjects'

interface Props {
  params: {
    id: string
  }
}
interface IProjectData {
  project: IProject
  writerProjects: Omit<IProject, 'writer'>[]
}
const DetailPage = ({ params }: Props) => {
  const id = params!.id
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IProjectData>()

  useEffect(() => {
    const isModal = document.querySelector('.modal')
    if (isModal) document.body.style.overflow = 'hidden'
    ;(async () => {
      console.log(process.env.NEXT_PUBLIC_BASE_URL + `/api/detail/${id}`)
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/detail/${id}`, {
        method: 'GET',
      })
      if (response.ok) {
        const json = await response.json()
        console.log(json)
        setData(json)
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
    <section className="detail-page">
      <Intro project={data!.project} />
      <RelativeProjects relativeProjects={data!.writerProjects} writer={data!.project.writer} />
    </section>
  )
}

export default DetailPage
