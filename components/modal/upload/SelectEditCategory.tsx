import { useUploadState } from '@/context/UploadContext'
import Image from 'next/image'
import React from 'react'

interface Props {
  items: {
    name: string
    iconUrl: string
    next: boolean
    onClick: () => void
  }[]
}
const SelectEditCategory = ({ items }: Props) => {
  const { page } = useUploadState()

  return (
    <div className="select-block-container">
      <ul className="block-list">
        {items.map((item) => (
          <li className="block-list__item" key={item.name} onClick={item.onClick}>
            <div className="icon-title">
              <Image src={item.iconUrl} width={20} height={20} alt={item.name} />
              <span className="title">{item.name}</span>
            </div>
            {item.next && <Image src="/arrowRight.svg" width={13} height={13} alt="next" />}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectEditCategory
