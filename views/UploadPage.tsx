'use client'
import InputFileBox from '@/components/common/InputFileBox'
import SideBar from '@/components/upload/SideBar'
import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import AddBlockLine from '@/components/upload/AddBlockLine'
import Button from '@/components/common/Button'
import BlockList from '@/components/upload/BlockList'
import { useForm } from '@/hooks'
import React, { useCallback } from 'react'

export type TInputValue = {
  thumbnail: string
  [key: string]: string
}
const initialInputValue = {
  thumbnail: '',
}
const UploadPage = () => {
  const { blockIndex, editBlocks } = useUploadState()
  const { openSideBar } = useUploadDispatch()

  const { inputValue, onHandleChangeImage, onHandleChange } =
    useForm<TInputValue>(initialInputValue)

  const onClick = () => {
    console.log(inputValue)
    const result = editBlocks.map((block, index) => ({
      type: block.type,
      value: inputValue[block.name],
    }))
    // textArea replace('\n','&nbsp;')
    console.log([{ type: 'thumbnail', value: inputValue['thumbnail'] }].concat(result))
  }
  console.log('upload page render')

  const Header = useCallback(() => {
    return (
      <React.Fragment>
        <div className="upload__header">
          <div className="button-group">
            <Button type="basic" text="취소" size="medium" />
          </div>
          <div className="button-group">
            <Button type="grey" text="임시 저장" size="medium" />
            <Button type="black" text="업로드" size="medium" onClick={onClick} />
          </div>
        </div>

        <SideBar />
      </React.Fragment>
    )
  }, [])
  return (
    <div className="upload-page">
      <div className="upload__header">
        <div className="button-group">
          <Button type="basic" text="취소" size="medium" />
        </div>
        <div className="button-group">
          <Button type="grey" text="임시 저장" size="medium" />
          <Button type="black" text="업로드" size="medium" onClick={onClick} />
        </div>
      </div>

      <SideBar />
      <div className="upload__content">
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
            inputValue={inputValue}
            onHandleChange={onHandleChange}
            onHandleChangeImage={onHandleChangeImage}
          />
        </>
        {/* ) : null} */}
      </div>
    </div>
  )
}
// {`upload-page ${openSideBar ? 'open' : ''}`}

export default UploadPage
