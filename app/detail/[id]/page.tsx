import DetailPage from '@/views/DetailPage'

interface Props {
  params: {
    id: string
  }
}
const page = ({ params }: Props) => {
  console.log(params)
  return <DetailPage params={params} />
}

export default page
