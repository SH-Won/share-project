import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getUserClippingProjects } from '@/lib/actions'
import UserClippingPage from '@/views/UserClippingPage'
import { getServerSession } from 'next-auth'
import React from 'react'
export const revalidate = 0
interface Props {
  params: {
    user: string
  }
}
const page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)
  const isSessionUser = session?.id === params.user
  const { projects, projectLength } = await getUserClippingProjects({
    sessionId: session?.id,
    userId: params.user,
    page: 1,
  })
  return (
    <UserClippingPage
      isSessionUser={isSessionUser}
      projects={projects}
      projectLength={projectLength}
    />
  )
}

export default page
