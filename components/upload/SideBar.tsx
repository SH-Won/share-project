'use client'
import { useUploadDispatch, useUploadState } from '@/context/UploadContext'
import { useBreakPoints } from '@/hooks'
import Image from 'next/image'
import React, { createContext, useState } from 'react'
import SelectEditCategory from '../modal/upload/SelectEditCategory'
import SideBarTextOptions from './SideBarTextOptions'
interface Props {
  open: boolean
  close: () => void
}

interface SideBarContextProps {
  pages: 'text' | 'main'
  close: () => void
}

const SideBar = () => {
  const { openSideBar } = useUploadState()
  const { setPage, reset, addBlock } = useUploadDispatch()
  const [transition, setTransition] = useState(false)
  const items = [
    {
      name: 'Text',
      iconUrl: '/text.svg',
      next: true,
      onClick: () => {
        setTransition(true)
        setPage('textOptions')
        //
      },
    },
    {
      name: 'Image',
      iconUrl: '/image.svg',
      next: false,
      onClick: () => {
        addBlock('image')
        reset()
        //
      },
    },
    {
      name: 'Image1',
      iconUrl: '/image.svg',
      next: false,
      onClick: () => {
        //
      },
    },
    {
      name: 'Image2',
      iconUrl: '/image.svg',
      next: false,
      onClick: () => {
        //
      },
    },
    {
      name: 'Image3',
      iconUrl: '/image.svg',
      next: false,
      onClick: () => {
        //
      },
    },
    {
      name: 'Image4',
      iconUrl: '/image.svg',
      next: false,
      onClick: () => {
        //
      },
    },
  ]
  const closeSideBar = () => {
    setTransition(false)
    reset()
  }
  console.log('Side bar render')
  return (
    <>
      <div className={`side-bar ${openSideBar ? 'open' : ''} ${transition ? 'transition' : ''}`}>
        <div className="side-bar-container">
          <Image src="/close.svg" width={20} height={20} alt="close" onClick={closeSideBar} />
          <div className="side-bar__main">
            <SelectEditCategory items={items} />
          </div>
          <div className="side-bar__second">
            <SideBarTextOptions />
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar
