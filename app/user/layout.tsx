import UserNavigation from '@/components/user/UserNavigation'
import '@/styles/layout/user-page.scss'
// import { useSelectedLayoutSegment } from 'next/navigation'
type Props = {
  children: React.ReactNode
}
export default function UserLayout({ children, ...arg }: Props) {
  // const segment = useSelectedLayoutSegment()
  // console.log(segment, 'segment')
  return (
    <section className="user-layout">
      <div className="user-navigation-wrapper">
        <UserNavigation />
      </div>
      <div className="user-page-wrapper">
        <div className="page-space border"></div>
        {children}
      </div>
      <div className="page-space"></div>
    </section>
  )
}
