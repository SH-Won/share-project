'use client'
import '@/styles/layout/detail-page.scss'
import { IProject } from '@/app/page'
import Intro from '@/components/detail/Intro'
import SkeletonDetail from '@/components/detail/SkeletonDetail'
import MoreByWriterProjects from '@/components/detail/MoreByWriterProjects'
import DetailHeader from '@/components/detail/DetailHeader'
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
      <MoreByWriterProjects
        projects={data!.writerProjects}
        writerName={data!.project.author.name}
      />
    </section>
  )
}

export default DetailPage
