import { IProject } from '@/app/page'
import React from 'react'
import ImageWithSkeleton from '../image/ImageWithSkeleton'
interface Props {
  project: IProject
}
const Intro = ({ project }: Props) => {
  return (
    <div className="detail-container">
      <ImageWithSkeleton type="detail" imageUrl={project.thumbnail.imageUrl} alt={project.title} />
      {/* <p className="detail-content__overview">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium illum cumque, eligendi
        non reiciendis hic deleniti sit maiores necessitatibus modi ex reprehenderit illo saepe
        aliquid nisi quas, repellendus facere sapiente.
      </p> */}
    </div>
  )
}

export default Intro
