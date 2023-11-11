'use client'
import { getData } from '@/lib/api'
import { RootState } from '@/store'
import { setProjects } from '@/store/project/projectSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useFetch = () => {
  const dispatch = useDispatch()
  const { projects, isInitialFetching } = useSelector((state: RootState) => state.project)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isInitialFetching) return
    getData()
      .then((response) => {
        dispatch(setProjects(response.reverse()))
      })
      .finally(() => setLoading(false))
  }, [])
  return {
    loading: !isInitialFetching,
    projects,
  }
}
export { useFetch }
