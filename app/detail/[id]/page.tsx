import DetailPage from '@/page/DetailPage'
import { NextPage } from 'next'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}
const page = ({ params }: Props) => {
  console.log(params)
  return <DetailPage params={params} />
}

export default page
