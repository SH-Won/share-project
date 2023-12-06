'use client'
import BackEnd from '@/lib/network'
import { IProjectDetailResponse } from '@/lib/network/types/project'
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
    BackEnd.getInstance()
      .project.getProjects(query)
      .then(async (response) => {
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
    limit: query.limit,
  }
}

const useDetailFetch = (id: string) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IProjectDetailResponse>()
  const [error, setError] = useState(false)

  const refresh = () => {
    setLoading(true)
    setError(false)
  }
  useEffect(() => {
    if (error) return
    const isModal = document.querySelector('.modal')
    if (isModal) document.body.style.overflow = 'hidden'
    BackEnd.getInstance()
      .project.getProjectDetail(id)
      .then(setData)
      .catch(async (e) => {
        setError(true)
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
