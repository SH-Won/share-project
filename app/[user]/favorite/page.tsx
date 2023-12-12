import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getUserFavoriteProjects } from '@/lib/actions'
import UserActivityPage from '@/views/UserActivityPage'
import UserFavoritePage from '@/views/UserFavoritePage'
import { getServerSession } from 'next-auth'
import React from 'react'
// export const revalidate = 0
interface Props {
  params: {
    user: string
  }
}
const page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)
  const isSessionUser = session?.id === params.user
  // const { projects, projectLength } = await getUserFavoriteProjects({
  //   sessionId: session?.id,
  //   userId: params.user,
  //   page: 1,
  // })
  return (
    <UserFavoritePage
      isSessionUser={isSessionUser}
      // projects={projects}
      // projectLength={projectLength}
    />
  )
}

export default page
