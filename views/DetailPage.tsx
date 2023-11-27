'use client'
import '@/styles/layout/detail-page.scss'
import { IProject } from '@/app/page'
import Intro from '@/components/detail/Intro'
import SkeletonDetail, { SkeletonDetailHeader } from '@/components/detail/SkeletonDetail'
import MoreByWriterProjects from '@/components/detail/MoreByWriterProjects'
import DetailHeader from '@/components/detail/DetailHeader'
import { useDetailFetch } from '@/hooks'
import { TEditBlock } from '@/context/UploadContext'
import DetailBlocks from '@/components/detail/DetailBlocks'
import ErrorNotification from '@/components/common/ErrorNotification'

interface Props {
  params: {
    id: string
  }
}
export interface IDetailProject extends IProject {
  blocks: Omit<TEditBlock, 'name'>[]
}
interface IProjectData {
  project: IDetailProject
  writerProjects: Omit<IProject, 'writer'>[]
}
const DetailPage = ({ params }: Props) => {
  const id = params!.id
  const { data, loading, error, refresh } = useDetailFetch(id)
  if (loading) return <SkeletonDetail />
  if (error)
    return (
      <SkeletonDetailHeader>
        <ErrorNotification onClick={refresh} />
      </SkeletonDetailHeader>
    )
  console.log('detail data', data)
  return (
    <section className="detail-page">
      <DetailHeader project={data!.project} />
      <Intro project={data!.project} />
      <DetailBlocks blocks={data!.project.blocks} />
      <MoreByWriterProjects
        projects={data!.writerProjects}
        writerName={data!.project.author.name}
      />
    </section>
  )
}

export default DetailPage
