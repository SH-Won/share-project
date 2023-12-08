import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import BackEnd from '@/lib/network'
import UserWorkPage from '@/views/UserWorkPage'
import { getServerSession } from 'next-auth'
import React, { use } from 'react'

const page = () => {
  return <UserWorkPage />
}

export default page
