import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getUserProjects } from '@/lib/actions'
import BackEnd from '@/lib/network'
import UserWorkPage from '@/views/UserWorkPage'
import { getServerSession } from 'next-auth'
import React, { use } from 'react'
export const revalidate = 0
interface Props {
  params: {
    user: string
  }
}
const page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)
  const isSessionUser = session?.id === params.user
  const { projects, projectLength } = await getUserProjects({
    sessionId: session?.id,
    userId: params.user,
    page: 1,
  })
  return (
    <UserWorkPage isSessionUser={isSessionUser} projects={projects} projectLength={projectLength} />
  )
}

export default page
