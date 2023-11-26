import ImageWithSkeleton from '@/components/image/ImageWithSkeleton'
import { TEditBlock } from '@/context/UploadContext'
import { IDetailProject } from '@/views/DetailPage'
import React, { useCallback } from 'react'

const useBlock = (blocks: IDetailProject['blocks']) => {
  // const getBlockComponent = useCallback((block) => {}, [])

  const RenderBlocks = () => {
    return (
      <React.Fragment>
        {blocks.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return (
                <h2 className="heading" key={block.type + index}>
                  {block.value}
                </h2>
              )
            case 'textArea':
              return (
                <p className="description" key={block.type + index}>
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
                <ImageWithSkeleton type="detail" imageUrl={block.value} alt={block.type + index} />
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
