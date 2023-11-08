import DetailPage from '@/pages/DetailPage'
import { NextPage } from 'next'
import React from 'react'

const page = ({ params }) => {
  console.log(params)
  return <DetailPage params={params} />
}

export default page
