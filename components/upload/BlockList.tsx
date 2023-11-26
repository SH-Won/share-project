'use client'
import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import { useForm } from '@/hooks'
import { TInputValue } from '@/views/UploadPage'
import React, { useMemo, useState } from 'react'
import AddBlockLine from './AddBlockLine'
import BlockHeading from './input-block/BlockHeading'
import BlockImage from './input-block/BlockImage'
import BlockTextArea from './input-block/BlockTextArea'

type Props = Pick<
  ReturnType<typeof useForm<TInputValue>>,
  'inputValue' | 'onHandleChange' | 'onHandleChangeImage'
>
const BlockList = ({ inputValue, onHandleChange, onHandleChangeImage }: Props) => {
  const { editBlocks, blockIndex } = useUploadState()
  const { openSideBar } = useUploadDispatch()
  const [focusBlock, setFocusBlock] = useState<string>('')
  // const initialState = useMemo(() => {
  //   return Object.fromEntries(editBlocks.map((block) => [block.name, block.value]))
  // }, [editBlocks])
  // const { inputValue, onHandleChange, onHandleChangeImage } =
  // useForm<typeof initialState>(initialState)

  const onClickFocus = (name: string, index: number) => {
    setFocusBlock(name)
    blockIndex.current = index
  }
  const onClickBlockLine = (index: number) => {
    openSideBar()
    blockIndex.current = index + 1
  }
  const renderBlocks = useMemo(() => {
    return editBlocks.map((block, index) => {
      switch (block.type) {
        case 'heading':
          return (
            <React.Fragment key={block.name}>
              <div className="input-container" onClick={() => onClickFocus(block.name, index)}>
                <BlockHeading
                  value={inputValue[block.name]}
                  onHandleChange={onHandleChange}
                  name={block.name}
                  placeholder="Heading"
                  focus={block.name === focusBlock}
                />
              </div>
              <AddBlockLine onClick={() => onClickBlockLine(index)} />
            </React.Fragment>
          )
        case 'image':
          return (
            <React.Fragment key={block.name}>
              <div onClick={() => onClickFocus(block.name, index)}>
                <BlockImage
                  focus={block.name === focusBlock}
                  value={inputValue[block.name]}
                  onHandleChange={onHandleChangeImage}
                  name={block.name}
                />
              </div>
              <AddBlockLine onClick={() => onClickBlockLine(index)} />
            </React.Fragment>
          )
        case 'textArea':
          return (
            <React.Fragment key={block.name}>
              <div
                className="input-container"
                key={block.name}
                onClick={() => onClickFocus(block.name, index)}
              >
                <BlockTextArea
                  value={inputValue[block.name]}
                  onHandleChange={onHandleChange}
                  name={block.name}
                  placeholder="Description"
                  focus={block.name === focusBlock}
                />
              </div>
              <AddBlockLine onClick={() => onClickBlockLine(index)} />
            </React.Fragment>
          )
        default:
          return null
      }
    })
  }, [editBlocks, inputValue, focusBlock])
  return <div className="upload__content__blocks">{renderBlocks}</div>
}

export default BlockList
