'use client'
import ErrorBack from '@/components/error/ErrorBack'
import ErrorNotification from '@/components/error/ErrorNotification'
import BackEnd from '@/lib/network'
import { BadResponse } from '@/lib/network/fetchAPI'
import { IProjectDetailResponse } from '@/lib/network/types/project'
import { RootState } from '@/store'
import { setLoading, setProjects, setQuery, setReadyToFetch } from '@/store/project/projectSlice'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
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
  const [error, setError] = useState<BadResponse>({} as BadResponse)
  const [message, setMessage] = useState('')

  const refresh = () => {
    setLoading(true)
    // setError(false)
    setError({} as BadResponse)
  }
  const back = () => {
    // setError({} as BadResponse)
    router.back()
  }
  const ErrorComponent = useCallback(() => {
    switch (error.status) {
      case 401:
        return <ErrorBack onClick={back} message={error.message} />
      default:
        return <ErrorNotification onClick={refresh} />
    }
  }, [error, message])
  useEffect(() => {
    if (error.status) return
    const isModal = document.querySelector('.modal')
    if (isModal) document.body.style.overflow = 'hidden'
    BackEnd.getInstance()
      .project.getProjectDetail(id)
      .then(setData)
      .catch(async (e: BadResponse) => {
        // setMessage(e.message || '')
        // setError(true)
        setError(e)
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
    ErrorComponent,
  }
}
export { useFetch, useDetailFetch }
