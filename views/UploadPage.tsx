'use client'
import InputFileBox from '@/components/common/InputFileBox'
import SideBar from '@/components/upload/SideBar'
import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import AddBlockLine from '@/components/upload/AddBlockLine'
import Button from '@/components/common/Button'
import BlockList from '@/components/upload/BlockList'
import { useForm } from '@/hooks'

export type TInputValue = {
  thumbnail: string
  [key: string]: string
}
const initialInputValue = {
  thumbnail: '',
}
const UploadPage = () => {
  // const { openSideBar, blockIndex } = useUploadState()
  // const { setOpenSideBar } = useUploadDispatch()
  const { blockIndex } = useUploadState()
  const { openSideBar } = useUploadDispatch()

  const { inputValue, onHandleChangeImage, onHandleChange } =
    useForm<TInputValue>(initialInputValue)

  // const onClick = () => {
  //   const values = Object.values(inputValue)
  //   const result = editBlocks.map((block, index) => ({ type: block.type, value: values[index] }))
  //   console.log(result)
  // }
  console.log('upload page render')

  return (
    <div className="upload-page">
      <div className="header__upload">
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
          <InputFileBox
            id="thumbnail"
            name="thumbnail"
            value={inputValue.thumbnail}
            onHandleChange={onHandleChangeImage}
          >
            <InputFileBox.ProjectUploader />
          </InputFileBox>
        </div>
        {/* {inputValue.thumbnail ? ( */}
        <>
          <AddBlockLine
            onClick={() => {
              // setOpenSideBar(true)
              openSideBar()
              blockIndex.current = 0
            }}
          />
          <BlockList
          // inputValue={inputValue}
          // onHandleChange={onHandleChange}
          // onHandleChangeImage={onHandleChangeImage}
          />
        </>
        {/* ) : null} */}
      </div>
    </div>
  )
}
// {`upload-page ${openSideBar ? 'open' : ''}`}

export default UploadPage
