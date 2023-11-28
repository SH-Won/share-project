import { getData } from '@/lib/api'
import MainPage from '@/views/MainPage'
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

export default function Home() {
  // const projects = use(
  //   getData({
  //     skip: 0,
  //     limit: 20,
  //   })
  // )
  // const projects = await getData({ skip: 0, limit: 20 })
  return <MainPage />
}
{
  // /* @ts-expect-error Async Server Component */
}
