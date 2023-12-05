'use client'
import { IProject } from '@/lib/network/types/project'
import { IUserItemResponse } from '@/lib/network/types/user'
import { IUserProjectQuery } from '@/lib/network/user'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useInfinityScroll } from './useInfinityScroll'

interface Props<T extends IProject> {
  fetchFunc: (query: IUserProjectQuery) => Promise<{ projects: T[]; projectLength: number }>
}
const useInfinityFetch = <T extends IProject, U extends HTMLElement>({ fetchFunc }: Props<T>) => {
  // const { data: session } = useSession()
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState({
    skip: 0,
    limit: 5,
    // userId: session?.id,
  })

  const loadMore = () => {
    setQuery((prev) => ({
      ...prev,
      skip: prev.skip + prev.limit,
    }))
  }
  const refresh = () => {
    setQuery((prev) => ({
      skip: prev.skip,
      limit: prev.limit,
      // userId: prev.userId,
    }))
  }
  useEffect(() => {
    if (!hasMore) return
    setLoading(true)
    fetchFunc(query)
      .then((response) => {
        setData((prev) => [...prev, ...response.projects])
        setHasMore(response.projectLength >= query.limit)
      })
      .catch((e) => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [query])
  const { targetRef } = useInfinityScroll<U>({
    loading,
    hasMore,
    error,
    callback: loadMore,
  })

  return {
    targetRef,
    loading,
    error,
    data,
    refresh,
  }
}

export { useInfinityFetch }
