'client'
import DetailPage from '@/views/DetailPage'

interface Props {
  params: {
    id: string
  }
}
const page = ({ params }: Props) => {
  return <DetailPage params={params} />
}

export default page
