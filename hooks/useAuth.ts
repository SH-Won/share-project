'use client'
import { AppDispatch, RootState } from '@/store'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const useAuth = () => {
  const [loading, setLoading] = useState()
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const login = async () => {}
  const checkLogin = async () => {}
  const logout = async () => {}

  return {
    user,
    login,
    checkLogin,
    logout,
  }
}
export { useAuth }
