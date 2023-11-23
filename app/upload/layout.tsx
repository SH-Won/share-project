import '@/styles/layout/upload-page.scss'
// import { useSelectedLayoutSegment } from 'next/navigation'
type Props = {
  children: React.ReactNode
}
export default function UploadLayout({ children, ...arg }: Props) {
  // const segment = useSelectedLayoutSegment()
  // console.log(segment, 'segment')
  return <section>{children}</section>
}
