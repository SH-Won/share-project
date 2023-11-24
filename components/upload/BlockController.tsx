import Image from 'next/image'
import React from 'react'

const items = [
  {
    name: 'up',
    iconUrl: '/arrowUp.svg',
    onClick: () => {
      //
    },
  },
  {
    name: 'down',
    iconUrl: '/arrowDown.svg',
    onClick: () => {
      //
    },
  },
  {
    name: 'paste',
    iconUrl: '/paste.svg',
    onClick: () => {
      //
    },
  },
  {
    name: 'delete',
    iconUrl: '/delete.svg',
    onClick: () => {
      //
    },
  },
]

const BlockController = ({ name }: { name: string }) => {
  const index = name.split('_')[1]
  return (
    <div className="block-controller">
      {items.map((item) => (
        <span key={item.name}>
          <Image src={item.iconUrl} alt={item.name} width={13} height={18} />
        </span>
      ))}
    </div>
  )
}

export default BlockController
