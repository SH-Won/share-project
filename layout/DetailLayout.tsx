// 'use client'

// import { usePathname } from 'next/navigation'
interface DetailLayoutProps {
  children: React.ReactNode
  // searchParams: { [key: string]: string | string[] | undefined }
}
const DetailLayout = (props: DetailLayoutProps) => {
  // console.log('layout search params', props.searchParams)
  // const isMatch = pathname.split('/')[1] === 'detail'
  return <div>{props.children}</div>
}

export default DetailLayout
