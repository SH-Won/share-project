import { IProject } from '@/app/page'
import React from 'react'
import ImageWithSkeleton from '../image/ImageWithSkeleton'
import Close from '../modal/Close'
// import DetailHeader from './DetailHeader'
// import RelativeProjects from './RelativeProjects'
interface Props {
  project: IProject
}
const DetailPage = ({ project }: Props) => {
  return (
    <div className="detail-container">
      <Close />
      {/* <DetailHeader project={project} /> */}
      <ImageWithSkeleton type="detail" imageUrl={project.imageUrl} alt={project.title} />
      <p className="detail-content__overview">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium illum cumque, eligendi
        non reiciendis hic deleniti sit maiores necessitatibus modi ex reprehenderit illo saepe
        aliquid nisi quas, repellendus facere sapiente.
      </p>
    </div>
  )
}

export default DetailPage
