'use client'
import BackEnd from '@/lib/network'
import { AppDispatch } from '@/store'
import { setLoading, setUserInfo } from '@/store/user/userSlice'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
const SettingClientUser = ({
  children, // session,
  session,
}: {
  children: React.ReactNode
  session?: Session
}) => {
  // const { data: session, status } = useSession()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (!session) {
      dispatch(setLoading(false))
      return
    }
    dispatch(setLoading(true))
    BackEnd.getInstance()
      .user.getUserInventory()
      .then((response) => {
        dispatch(setUserInfo(response.userInventory))
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => dispatch(setLoading(false)))
  }, [session])
  return <>{children}</>
}
export default SettingClientUser
