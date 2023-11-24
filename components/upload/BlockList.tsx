'use client'
import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import { useForm } from '@/hooks'
import React, { useMemo, useState } from 'react'
import InputBox from '../common/InputBox'
import InputFileBox from '../common/InputFileBox'
import AddBlockLine from './AddBlockLine'
import BlockController from './BlockController'
import BlockHeading from './input-block/BlockHeading'
import BlockImage from './input-block/BlockImage'
import BlockTextArea from './input-block/BlockTextArea'

const BlockList = () => {
  const { editBlocks, blockIndex } = useUploadState()
  const { setOpenSideBar } = useUploadDispatch()
  const [focusBlock, setFocusBlock] = useState<string>('')
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
              <div className="input-container" onClick={() => setFocusBlock(block.name)}>
                <BlockHeading
                  value={inputValue[block.name]}
                  onHandleChange={onHandleChange}
                  name={block.name}
                  placeholder="Heading"
                  focus={block.name === focusBlock}
                />
              </div>
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
              <div onClick={() => setFocusBlock(block.name)}>
                <BlockImage
                  focus={block.name === focusBlock}
                  value={inputValue[block.name]}
                  onHandleChange={onHandleChangeImage}
                  name={block.name}
                />
              </div>
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
              <div
                className="input-container"
                key={block.name}
                onClick={() => setFocusBlock(block.name)}
              >
                <BlockTextArea
                  value={inputValue[block.name]}
                  onHandleChange={onHandleChange}
                  name={block.name}
                  placeholder="Description"
                  focus={block.name === focusBlock}
                />
              </div>
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
  }, [editBlocks, inputValue, focusBlock])
  return <div className="upload-content__blocks">{renderBlocks}</div>
}

export default BlockList
