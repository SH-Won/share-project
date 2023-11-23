import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import React from 'react'

const SideBarTextOptions = () => {
  const { page } = useUploadState()
  const { addBlock } = useUploadDispatch()
  if (page !== 'textOptions') return null
  return (
    <div>
      <div
        onClick={() => {
          addBlock('heading')
        }}
      >
        add Heading
      </div>
      <div
        onClick={() => {
          addBlock('textArea')
        }}
      >
        add TextBlock
      </div>
    </div>
  )
}

export default SideBarTextOptions
