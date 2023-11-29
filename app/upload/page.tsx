import UploadContext from '@/context/UploadContext'
import UploadPage from '@/views/UploadPage'

const page = () => {
  return (
    <UploadContext>
      <UploadPage />
    </UploadContext>
  )
}

export default page
