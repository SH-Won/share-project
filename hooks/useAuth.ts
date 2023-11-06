'use client'
import { AppDispatch, RootState } from '@/store'
import { setUser } from '@/store/user/userSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const useAuth = () => {
  const [loading, setLoading] = useState()
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const login = async () => {}
  const checkLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        credentials: 'include',
      })
        .then(async (response) => {
          if (!response.ok) {
            return fetch('http://localhost:3000/api/auth/refresh', {
              credentials: 'include',
            })
          } else {
            return response
          }
        })
        .then(async (response) => {
          if (!response.ok) {
            return false
          } else {
            return await response.json()
          }
        })
      if (response) dispatch(setUser(response))
      return response
    } catch (e) {}
  }
  const logout = async () => {}

  return {
    user,
    login,
    checkLogin,
    logout,
  }
}
export { useAuth }
