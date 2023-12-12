'use client'
import { IProject } from '@/lib/network/types/project'
import { IUserItemResponse } from '@/lib/network/types/user'
import { IUserProjectQuery } from '@/lib/network/user'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useInfinityScroll } from './useInfinityScroll'

interface Props<T extends IProject> {
  initialState?: T[]
  hasMore?: boolean
  fetchFunc: (query: IUserProjectQuery) => Promise<{ projects: T[]; projectLength: number }>
}
const useInfinityFetch = <T extends IProject, U extends HTMLElement>({
  initialState,
  hasMore: isHasMore,
  fetchFunc,
}: Props<T>) => {
  // const { data: session } = useSession()
  const pathname = usePathname()
  const userId = pathname.split('/')[1]
  const [data, setData] = useState<T[]>(initialState || [])
  const [totalLength, setTotalLength] = useState(0)
  const [loading, setLoading] = useState(true)
  // const [hasMore, setHasMore] = useState(isHasMore!)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(false)
  // const [query, setQuery] = useState({
  //   skip: 0,
  //   limit: 5,
  //   // userId: session?.id,
  // })
  const [query, setQuery] = useState({
    page: 1,
    userId,
  })

  const updateData = (index: number) => {
    const copyData = [...data]
    copyData.splice(index, 1)
    setData(copyData)
  }
  const loadMore = async () => {
    // setLoading(true)
    // const response = await fetchFunc(query)
    // const { projects, projectLength } = JSON.parse(JSON.stringify(response))

    // const hasMore = projects.length + data.length < projectLength
    // setData((prev) => [...prev, ...projects])
    // setTotalLength(projectLength)
    // setHasMore(hasMore)
    // setLoading(true)
    // fetchFunc(query)
    //   .then((response) => {
    //     const hasMore = response.projects.length + data.length < response.projectLength
    //     setData((prev) => [...prev, ...response.projects])
    //     setTotalLength(response.projectLength)
    //     setHasMore(hasMore)
    //   })
    //   .catch((e) => {
    //     setError(true)
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
    setQuery((prev) => ({
      ...prev,
      page: prev.page + 1,
    }))
  }
  const refresh = () => {
    setQuery({
      ...query,
    })
    setError(false)
  }
  useEffect(() => {
    if (!hasMore) return
    setLoading(true)
    fetchFunc(query)
      .then((response) => {
        const hasMore = response.projects.length + data.length < response.projectLength
        setData((prev) => [...prev, ...response.projects])
        setTotalLength(response.projectLength)
        setHasMore(hasMore)
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
    totalLength,
    loading,
    error,
    data,
    updateData,
    refresh,
  }
}

export { useInfinityFetch }
