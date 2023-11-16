import Loading from '@/components//loading'
import { getData } from '@/lib/api'
import MainPage from '@/views/MainPage'
import { lazy, Suspense, use } from 'react'
export interface IProject {
  _id: string
  title: string
  description: string
  imageUrl: string
  writer: {
    _id: string
    image: string
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
