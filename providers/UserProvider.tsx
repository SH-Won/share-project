'use client'
import { AppDispatch } from '@/store'
import { setLoading, setUserInfo } from '@/store/user/userSlice'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  console.log('session', session)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (!session?.id) {
      dispatch(setLoading(false))
      return
    }
    dispatch(setLoading(true))
    ;(async () => {
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/user?userId=${session.id}`, {
        method: 'GET',
      })
        .then(async (response) => {
          if (response.ok) {
            const json = await response.json()
            console.log('user inventory', json)
            dispatch(setUserInfo(json.userInventory))
          }
        })
        .catch((e) => {
          console.log('user provider error', e)
        })
        .finally(() => {
          dispatch(setLoading(false))
        })
    })()
  }, [session])
  return <>{children}</>
}

export { UserProvider }
