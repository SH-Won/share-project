import ContentNavigation from '@/components/user/ContentNavigation'
// import UserNavigation from '@/components/user/UserNavigation'
import UserProfile, { AnotherUserProfile } from '@/components/user/UserProfile'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
// import { useSelectedLayoutSegment } from 'next/navigation'
type Props = {
  children: React.ReactNode
  params: {
    user: string
  }
}
export default async function UserLayout({ children, params }: Props) {
  // const session = await getServerSession()
  const session = await getServerSession(authOptions)
  const isSessionUser = session?.id === params.user
  return (
    <section className="user-layout">
      {isSessionUser ? (
        <UserProfile session={session} />
      ) : (
        <AnotherUserProfile userId={params.user} />
      )}
      <ContentNavigation />
      {children}
    </section>
  )
}
