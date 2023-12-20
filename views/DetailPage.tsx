'use client'
import Intro from '@/components/detail/Intro'
import SkeletonDetail, { SkeletonDetailHeader } from '@/components/detail/SkeletonDetail'
import MoreByWriterProjects from '@/components/detail/MoreByWriterProjects'
import DetailHeader from '@/components/detail/DetailHeader'
import { useDetailFetch } from '@/hooks'
import DetailBlocks from '@/components/detail/DetailBlocks'
import ErrorNotification from '@/components/error/ErrorNotification'

interface Props {
  params: {
    id: string
  }
}

const DetailPage = ({ params }: Props) => {
  const id = params!.id
  const { data, loading, error, ErrorComponent } = useDetailFetch(id)
  if (loading) return <SkeletonDetail />
  if (error.status)
    return (
      <SkeletonDetailHeader>
        <ErrorComponent />
      </SkeletonDetailHeader>
    )
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
