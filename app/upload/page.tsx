import UploadContext from '@/context/UploadContext'
import UploadPage from '@/views/UploadPage'
import React from 'react'

const page = () => {
  return (
    <UploadContext>
      <UploadPage />
    </UploadContext>
  )
}

export default page
