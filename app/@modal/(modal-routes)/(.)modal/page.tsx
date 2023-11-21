'use client'
import BottomSheetModal from '@/components/modal/BottomSheetModal'
import UploadProject from '@/components/upload/UploadProject'

const page = () => {
  return (
    <div className="modal">
      <BottomSheetModal>
        <UploadProject />
      </BottomSheetModal>
    </div>
  )
}

export default page
