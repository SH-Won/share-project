// import Loading from '@/components/loading'
import BackEnd from '@/lib/network'
import MainPage from '@/views/MainPage'
// import { Suspense } from 'react'

export default async function Home() {
  // const projects = use(
  //   getData({
  //     skip: 0,
  //     limit: 20,
  //   })
  // )
  // const projects = await BackEnd.getInstance().project.getProjects({
  //   skip: 0,
  //   limit: 5,
  // })
  return (
    // <Suspense fallback={<Loading count={5} />}>
    <MainPage />
    // </Suspense>
  )
}
{
  // /* @ts-expect-error Async Server Component */
}
