import { IProject } from '@/app/page'

export const getData = async (): Promise<IProject[]> => {
  // await new Promise((res) => setTimeout(res, 1000000))
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api', {
    // cache: 'no-store',
  })
  if (!response.ok) {
    return []
  }
  const products = (await response.json()).products
  return (products as IProject[]) || []
}
