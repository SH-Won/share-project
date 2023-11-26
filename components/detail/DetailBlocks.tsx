import { useBlock } from '@/hooks'
import { IDetailProject } from '@/views/DetailPage'
import React from 'react'
interface Props {
  blocks: IDetailProject['blocks']
}
const DetailBlocks = ({ blocks }: Props) => {
  const RenderBlocks = useBlock(blocks)
  return (
    <div className="detail-content">
      <RenderBlocks />
    </div>
  )
}

export default DetailBlocks
