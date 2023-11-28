import { useUploadDispatch } from '@/context/UploadContext'
import { useModal } from '@/hooks'
import Image from 'next/image'
import React from 'react'

const useItems = () => {
  const { moveUpBlock, moveDownBlock, pasteBlock, deleteBlock } = useUploadDispatch()
  const { showModal, closeModal } = useModal()
  const items = [
    {
      name: 'up',
      iconUrl: '/arrowUp.svg',
      onClick: moveUpBlock,
    },
    {
      name: 'down',
      iconUrl: '/arrowDown.svg',
      onClick: moveDownBlock,
    },
    {
      name: 'paste',
      iconUrl: '/paste.svg',
      onClick: pasteBlock,
    },
    {
      name: 'delete',
      iconUrl: '/delete.svg',
      onClick: (name: string) => {
        showModal({
          type: 'user_confirm',
          props: {
            handleConfirm: () => deleteBlock(name),
            closeModal,
          },
        })
      },
    },
  ]

  return items
}

const BlockController = ({ name }: { name: string }) => {
  const items = useItems()
  return (
    <div className="block-controller">
      {items.map((item) => (
        <span key={item.name} onClick={() => item.onClick(name)}>
          <Image src={item.iconUrl} alt={item.name} width={13} height={18} />
        </span>
      ))}
    </div>
  )
}

export default BlockController
