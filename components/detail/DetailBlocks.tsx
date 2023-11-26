'use client'
import { useBlock } from '@/hooks'
import { IDetailProject } from '@/views/DetailPage'
import React from 'react'
import ImageWithSkeleton from '../image/ImageWithSkeleton'
interface Props {
  blocks: IDetailProject['blocks']
}
const DetailBlocks = ({ blocks }: Props) => {
  // const RenderBlocks = useBlock(blocks)
  return (
    <div className="detail-content">
      {/* <RenderBlocks /> */}
      {blocks.map((block, index) => {
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
                <ImageWithSkeleton type="detail" imageUrl={block.value} alt={block.type + index} />
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default DetailBlocks
