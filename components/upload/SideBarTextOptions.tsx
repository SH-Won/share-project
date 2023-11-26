import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import React from 'react'

const SideBarTextOptions = () => {
  const { page } = useUploadState()
  const { addBlock } = useUploadDispatch()
  if (page !== 'textOptions') return null
  return (
    <div className="text-options-container">
      <div
        className="text-options heading"
        onClick={() => {
          addBlock('heading')
        }}
      >
        Heading
      </div>
      <div
        className="text-options paragraph"
        onClick={() => {
          addBlock('textArea')
        }}
      >
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi excepturi eaque pariatur
          atque.
        </span>
      </div>
    </div>
  )
}

export default SideBarTextOptions
