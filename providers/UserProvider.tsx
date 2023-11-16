'use client'
import { AppDispatch } from '@/store'
import { setLoading, setUserInfo } from '@/store/user/userSlice'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  console.log(session)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    console.log('useEffect userProvider')
    if (!session?.id) {
      console.log('return ')
      return
    }
    console.log('fetch start')
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
          console.log(e)
        })
        .finally(() => {
          dispatch(setLoading(false))
        })
    })()
    // fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/user?favoriteId=${session.favoriteId}`, {})
    //   .then(async (response) => {
    //     if (response.ok) {
    //       const json = await response.json()
    //       dispatch(setUserInfo(json))
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
  }, [session])
  return <>{children}</>
}

export { UserProvider }
