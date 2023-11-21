import Loading from '@/components//loading'
import { getData } from '@/lib/api'
import MainPage from '@/views/MainPage'
import { lazy, Suspense, use } from 'react'
export interface IProject {
  _id: string
  title: string
  description: string
  imageUrl: string
  author: {
    _id: string
    imageUrl: string
    name: string
  }
  favoriteUsers: string[]
}

export default function Home() {
  // const projects = use(getData())
  return <MainPage />
}
{
  // /* @ts-expect-error Async Server Component */
}
