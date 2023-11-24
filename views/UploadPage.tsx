'use client'
import InputFileBox from '@/components/common/InputFileBox'
import SideBar from '@/components/upload/SideBar'
import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import AddBlockLine from '@/components/upload/AddBlockLine'
import Button from '@/components/common/Button'
import BlockList from '@/components/upload/BlockList'

const UploadPage = () => {
  const { openSideBar, editBlocks, blockIndex } = useUploadState()
  const { setOpenSideBar } = useUploadDispatch()

  // const onClick = () => {
  //   const values = Object.values(inputValue)
  //   const result = editBlocks.map((block, index) => ({ type: block.type, value: values[index] }))
  //   console.log(result)
  // }
  console.log('upload page render')

  return (
    <div className={`upload-page ${openSideBar ? 'open' : ''}`}>
      <div>
        <Button
          type="black"
          text="업로드"
          size="medium"
          // onClick={onClick}
        />
      </div>
      <SideBar />
      <div className="upload-content">
        <div className="file-upload-wrapper">
          <InputFileBox id="tumbnail" name="tumbnail" onHandleChange={() => {}}>
            <InputFileBox.ProjectUploader />
          </InputFileBox>
        </div>
        <AddBlockLine
          onClick={() => {
            setOpenSideBar(true)
            blockIndex.current = 0
          }}
        />
        <BlockList />
      </div>
    </div>
  )
}

export default UploadPage
