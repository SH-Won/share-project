'use client'
import '@/styles/layout/detail-page.scss'
import Intro from '@/components/detail/Intro'
import SkeletonDetail, { SkeletonDetailHeader } from '@/components/detail/SkeletonDetail'
import MoreByWriterProjects from '@/components/detail/MoreByWriterProjects'
import DetailHeader from '@/components/detail/DetailHeader'
import { useDetailFetch } from '@/hooks'
import DetailBlocks from '@/components/detail/DetailBlocks'
import ErrorNotification from '@/components/common/ErrorNotification'

interface Props {
  params: {
    id: string
  }
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
  return (
    <section className="detail-page">
      <DetailHeader
        project={data!.project}
        isUserFavorite={data!.isUserFavorite}
        isUserClipping={data!.isUserClipping}
      />
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
