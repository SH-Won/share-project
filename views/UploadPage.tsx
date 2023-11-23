'use client'
import InputFileBox from '@/components/common/InputFileBox'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm, useModal } from '@/hooks'
import SelectEditCategory from '@/components/modal/upload/SelectEditCategory'
import SideBar from '@/components/upload/SideBar'
import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import InputBox, { TextAreaBox } from '@/components/common/InputBox'
import AddBlockLine from '@/components/upload/AddBlockLine'
import Button from '@/components/common/Button'
import BlockControllLayout from '@/components/upload/BlockControllLayout'

const UploadPage = () => {
  const { openSideBar, editBlocks, blockIndex } = useUploadState()
  const { setOpenSideBar } = useUploadDispatch()

  const initialState = useMemo(() => {
    return Object.fromEntries(editBlocks.map((block) => [block.name, block.value]))
  }, [editBlocks])
  const { inputValue, onHandleChange, onHandleChangeImage } =
    useForm<typeof initialState>(initialState)
  const renderBlocks = useMemo(() => {
    return editBlocks.map((block, index) => {
      switch (block.type) {
        case 'heading':
          return (
            <React.Fragment key={block.name}>
              <InputBox
                value={inputValue[block.name]}
                onHandleChange={onHandleChange}
                name={block.name}
                placeholder="Heading"
              />
              <AddBlockLine
                onClick={() => {
                  setOpenSideBar(true)
                  blockIndex.current = index + 1
                }}
              />
            </React.Fragment>
          )
        case 'image':
          return (
            <React.Fragment key={block.name}>
              <InputFileBox
                value={inputValue[block.name]}
                onHandleChange={onHandleChangeImage}
                name={block.name}
                id={block.name}
              >
                <InputFileBox.Uploader />
              </InputFileBox>
              <AddBlockLine
                onClick={() => {
                  setOpenSideBar(true)
                  blockIndex.current = index + 1
                }}
              />
            </React.Fragment>
          )
        case 'textArea':
          return (
            <React.Fragment key={block.name}>
              <TextAreaBox
                value={inputValue[block.name]}
                onHandleChange={onHandleChange}
                name={block.name}
                placeholder="Description"
              />
              <AddBlockLine
                onClick={() => {
                  setOpenSideBar(true)
                  blockIndex.current = index + 1
                }}
              />
            </React.Fragment>
          )
        default:
          return null
      }
    })
  }, [editBlocks, inputValue])

  const onClick = () => {
    const values = Object.values(inputValue)
    const result = editBlocks.map((block, index) => ({ type: block.type, value: values[index] }))
    console.log(result)
  }
  console.log('upload page render')
  return (
    <div className={`upload-page ${openSideBar ? 'open' : ''}`}>
      <div>
        <Button type="black" text="업로드" size="medium" onClick={onClick} />
      </div>
      <SideBar />
      <div className="upload-content">
        <div className="file-upload-wrapper">
          <InputFileBox name="tumbnail" onHandleChange={() => {}}>
            <InputFileBox.Uploader />
          </InputFileBox>
        </div>
        <AddBlockLine
          onClick={() => {
            setOpenSideBar(true)
            blockIndex.current = 0
          }}
        />
        <div className="upload-content__blocks">{renderBlocks}</div>
      </div>
    </div>
  )
}

export default UploadPage
