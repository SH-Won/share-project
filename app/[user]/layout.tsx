import ContentNavigation from '@/components/user/ContentNavigation'
// import UserNavigation from '@/components/user/UserNavigation'
import UserProfile from '@/components/user/UserProfile'
// import { useSelectedLayoutSegment } from 'next/navigation'
type Props = {
  children: React.ReactNode
}
export default async function UserLayout({ children, ...arg }: Props) {
  // const segment = useSelectedLayoutSegment()
  // const session = await getServerSession()
  // console.log(session)
  return (
    // <section className="user-layout">
    //   <div className="user-navigation-wrapper">
    //     <UserNavigation />
    //   </div>
    //   <div className="user-page-wrapper">
    //     <div className="page-space border"></div>
    //     {children}
    //   </div>
    //   <div className="page-space"></div>
    // </section>
    <section className="user-layout">
      <UserProfile />
      <ContentNavigation />
      {children}
    </section>
  )
}
