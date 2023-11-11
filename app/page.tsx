// 'use client'

import Loading from '@/components/loading'
import { getData } from '@/lib/api'
import MainPage from '@/views/MainPage'
import { Suspense } from 'react'
// import Loading from './@project/loading'
// import '@/styles/components/project-card.scss'
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
}
export default async function Home() {
  // const [projects, setProjects] = useState<IProject[]>([])
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   getData().then(async (response) => {
  //     setProjects(response)
  //     setLoading(false)
  //   })
  // }, [])
  // if (loading)
  //   return (
  //     <div className="page-container">
  //       {Array(10)
  //         .fill(0)
  //         .map((_, i) => (
  //           <ProjectCardSkeleton key={i} />
  //         ))}
  //     </div>
  //   )
  return (
    // <Suspense fallback={<Loading />}>
    // </Suspense>
    <MainPage />
  )
}
