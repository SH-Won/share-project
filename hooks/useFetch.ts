'use client'
import { getData, getDetailData, TDetailData } from '@/lib/api'
import { RootState } from '@/store'
import { setLoading, setProjects, setQuery, setReadyToFetch } from '@/store/project/projectSlice'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const useFetch = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const { loading, projects, hasMore, query, isReadyToFetch } = useSelector(
    (state: RootState) => state.project
  )
  const loadMore = () => {
    if (!hasMore || error) {
      return
    }
    dispatch(
      setQuery({
        ...query,
        skip: query.skip + query.limit,
      })
    )
    dispatch(setReadyToFetch(true))
  }

  const refresh = () => {
    setError(false)
    dispatch(setReadyToFetch(true))
    dispatch(setLoading(true))
    dispatch(setQuery({ ...query }))
  }

  useEffect(() => {
    if (!isReadyToFetch) return
    dispatch(setLoading(true))
    getData(query)
      .then(async (response) => {
        // if (response.status !== 200) throw Error('load failed')
        // const json = await response.json()
        // console.log(json)
        dispatch(setProjects(response))
      })
      .catch((e) => {
        console.log(e)
        // 다시 fetching
        setError(true)
        dispatch(setReadyToFetch(false))
      })
      .finally(() => dispatch(setLoading(false)))
    return () => {
      dispatch(setReadyToFetch(false))
    }
  }, [query])
  return {
    loading,
    error,
    hasMore,
    projects,
    loadMore,
    refresh,
  }
}

const useDetailFetch = (id: string) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<TDetailData>()
  const [error, setError] = useState(false)

  const refresh = () => {
    setLoading(true)
    setError(false)
  }
  useEffect(() => {
    if (error) return
    const isModal = document.querySelector('.modal')
    if (isModal) document.body.style.overflow = 'hidden'
    getDetailData(id)
      .then(setData)
      .catch(async (e) => {
        console.log(await e.json())

        setError(true)
        // router.back()
      })
      .finally(() => setLoading(false))

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [id, error])
  return {
    loading,
    error,
    data,
    refresh,
  }
}
export { useFetch, useDetailFetch }
