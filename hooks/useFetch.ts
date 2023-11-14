'use client'
import { getData, getDetailData, TDetailData } from '@/lib/api'
import { RootState } from '@/store'
import { setProjects } from '@/store/project/projectSlice'
import { useRouter } from 'next/navigation'
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
        dispatch(setProjects(response))
      })
      .finally(() => setLoading(false))
  }, [])
  return {
    loading: !isInitialFetching,
    projects,
  }
}

const useDetailFetch = (id: string) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<TDetailData>()
  const [error, setError] = useState(false)
  useEffect(() => {
    const isModal = document.querySelector('.modal')
    if (isModal) document.body.style.overflow = 'hidden'
    getDetailData(id)
      .then(async (response) => {
        if (response.status !== 200) {
          const json = await response.json()
          throw Error(json.error)
        }
        const json = await response.json()
        setData(json)
      })
      .catch((e) => {
        setError(true)
        console.log(e)
        router.back()
      })
      .finally(() => setLoading(false))

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [id])
  return {
    loading,
    error,
    data,
  }
}
export { useFetch, useDetailFetch }
