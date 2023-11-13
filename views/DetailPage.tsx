'use client'
import '@/styles/layout/detail-page.scss'
import { IProject } from '@/app/page'
import Intro from '@/components/detail/Intro'
import SkeletonDetail from '@/components/detail/SkeletonDetail'
import { useEffect, useState } from 'react'
import RelativeProjects from '@/components/detail/RelativeProjects'
import DetailHeader from '@/components/detail/DetailHeader'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useDetailFetch } from '@/hooks'

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
  const { data, loading, error } = useDetailFetch(id)
  if (loading || error) return <SkeletonDetail />
  return (
    <section className="detail-page">
      <DetailHeader project={data!.project} />
      <Intro project={data!.project} />
      <RelativeProjects relativeProjects={data!.writerProjects} writer={data!.project.writer} />
    </section>
  )
}

export default DetailPage
