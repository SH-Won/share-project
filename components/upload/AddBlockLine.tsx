import Image from 'next/image'
import React from 'react'
interface Props {
  onClick: () => void
}
const AddBlockLine = ({ onClick }: Props) => {
  return (
    <div className="add-block-line" onClick={onClick}>
      <div className="line"></div>
      <div className="icon-plus">
        <Image src="/plus.svg" width={16} height={16} alt="add-block" />
      </div>
      <div className="line"></div>
    </div>
  )
}

export default AddBlockLine
