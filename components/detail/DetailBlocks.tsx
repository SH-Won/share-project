'use client'
import { useBlock } from '@/hooks'
import { IProjectDetail } from '@/lib/network/types/project'

import React from 'react'
import ImageWithSkeleton from '../image/ImageWithSkeleton'
interface Props {
  blocks: IProjectDetail['blocks']
}
const DetailBlocks = ({ blocks }: Props) => {
  return (
    <div className="detail-content">
      {blocks.map((block, index) => {
        if (!block.value) return null
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
                  <React.Fragment key={crypto.randomUUID()}>
                    <span>{string}</span>
                    <br />
                  </React.Fragment>
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
