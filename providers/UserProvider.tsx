// import { AppDispatch } from '@/store'
// import { setLoading, setUserInfo } from '@/store/user/userSlice'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession, Session } from 'next-auth'
import { use } from 'react'
// import { useSession } from 'next-auth/react'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import SettingClientUser from './SettingClientUser'

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // const { data: session } = useSession()
  const session = use(getServerSession(authOptions))
  // console.log('session', session)
  return <SettingClientUser session={session!}>{children}</SettingClientUser>
}

export { UserProvider }
