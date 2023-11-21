'use client'
import { getData, getDetailData, TDetailData } from '@/lib/api'
import { RootState } from '@/store'
import { setLoading, setProjects, setQuery, setReadyToFetch } from '@/store/project/projectSlice'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const useFetch = () => {
  const dispatch = useDispatch()
  const { loading, projects, hasMore, query, isReadyToFetch } = useSelector(
    (state: RootState) => state.project
  )
  const loadMore = () => {
    if (!hasMore) {
      return
    }
    console.log(query)
    dispatch(
      setQuery({
        ...query,
        skip: query.skip + query.limit,
      })
    )
    dispatch(setReadyToFetch(true))
  }

  useEffect(() => {
    if (!isReadyToFetch) return
    console.log(query)
    dispatch(setLoading(true))
    getData(query)
      .then(async (response) => {
        if (response.status !== 200) throw Error('load failed')
        const json = await response.json()
        console.log(json)
        dispatch(setProjects(json))
      })
      .catch((e) => {
        console.log(e)
        // 다시 fetching
      })
      .finally(() => dispatch(setLoading(false)))
    return () => {
      console.log('clear use fetch func')
      dispatch(setReadyToFetch(false))
    }
  }, [query])
  return {
    loading,
    hasMore,
    projects,
    loadMore,
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
