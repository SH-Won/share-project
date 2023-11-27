import { getData } from '@/lib/api'
import MainPage from '@/views/MainPage'
import { use } from 'react'
export interface IProject {
  _id: string
  title: string
  thumbnail: {
    imageUrl: string
  }
  author: {
    _id: string
    imageUrl: string
    name: string
  }
  favoriteUsers: string[]
}

export default async function Home() {
  // const projects = use(
  //   getData({
  //     skip: 0,
  //     limit: 20,
  //   })
  // )
  const projects = await getData({ skip: 0, limit: 20 })
  return <MainPage projects={projects.projects || []} />
}
{
  // /* @ts-expect-error Async Server Component */
}
