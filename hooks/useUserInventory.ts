'use client'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

const useUserInventory = () => {
  const { favorites } = useSelector((state: RootState) => state.user)

  return {
    favorites,
  }
}

export { useUserInventory }
