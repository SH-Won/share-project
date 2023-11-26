'use client'
import ImageWithSkeleton from '@/components/image/ImageWithSkeleton'
import { TEditBlock } from '@/context/UploadContext'
import { IDetailProject } from '@/views/DetailPage'
import React, { useCallback } from 'react'

const useBlock = (blocks: IDetailProject['blocks']) => {
  // const getBlockComponent = useCallback((block) => {}, [])

  const RenderBlocks = () => {
    return (
      <React.Fragment key="blocks">
        {blocks.map((block, index) => {
          console.log(block.type + index)
          switch (block.type) {
            case 'heading':
              return (
                <h2 className="heading" key={crypto.randomUUID()}>
                  {block.value}
                </h2>
              )
            case 'textArea':
              return (
                <p className="description" key={crypto.randomUUID()}>
                  {block.value.split('\n').map((string) => (
                    <>
                      <span>{string}</span>
                      <br />
                    </>
                  ))}
                </p>
              )
            case 'image':
              return (
                <div className="block-image" key={crypto.randomUUID()}>
                  <ImageWithSkeleton
                    type="detail"
                    imageUrl={block.value}
                    alt={block.type + index}
                  />
                </div>
              )
            default:
              return null
          }
        })}
      </React.Fragment>
    )
  }
  return RenderBlocks
}

export { useBlock }
