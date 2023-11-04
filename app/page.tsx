'use client'
import InputBox from '@/components/common/InputBox'
import LoginPage from '@/components/Login'
import { useModal } from '@/hooks'
import { AppDispatch, RootState } from '@/store'
import { resetUser, setUser } from '@/store/user/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './page.module.css'

export default function Home() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    ;(async () => {
      await fetch('/api/auth', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
        credentials: 'include',
      })
        .then(async (response) => {
          console.log(response)
          const json = await response.json()
          console.log(json)
          if (response.status !== 200) {
            await fetch('api/auth/refresh', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            }).then(async (response) => {
              if (response.status === 200) {
                const json = await response.json()
                console.log(json)
                dispatch(
                  setUser({
                    accessToken: json.accessToken,
                  })
                )
              } else {
                dispatch(resetUser())
              }
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })()
  }, [])
  console.log(user)
  const { showModal } = useModal()
  const onClick = () => {
    showModal({
      type: 'bottomModal',
      component: () => <div>project</div>,
      props: '',
    })
  }

  return (
    <div>
      <div onClick={onClick}>show modal</div>
      <InputBox />
      {!user.accessToken ? <LoginPage /> : <div> login ok</div>}
    </div>
  )
}
