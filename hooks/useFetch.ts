'use client'
import { getData } from '@/lib/api'
import { RootState } from '@/store'
import { setProjects } from '@/store/project/projectSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useFetch = () => {
  const dispatch = useDispatch()
  const { projects } = useSelector((state: RootState) => state.project)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
      .then((response) => {
        dispatch(setProjects(response))
      })
      .finally(() => setLoading(false))
  }, [])
  return {
    loading,
    projects,
  }
}
export { useFetch }
