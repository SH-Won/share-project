'use client'

// import { IProject } from '@/app/page'
// import Intro from '@/components/detail/Intro'
// import SkeletonDetail from '@/components/detail/SkeletonDetail'
// import Close from '@/components/modal/Close'
import DetailPage from '@/views/DetailPage'
// import { useEffect, useState } from 'react'

interface Props {
  params: {
    id: string
  }
}
const page = ({ params }: Props) => {
  return (
    <div className="modal__content--bottom open">
      <DetailPage params={params} />
    </div>
  )
}

export default page
