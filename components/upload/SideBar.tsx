'use client'
import { StateContext, useUploadDispatch, useUploadState } from '@/context/UploadContext'
import { useBreakPoints } from '@/hooks'
import Image from 'next/image'
import React, { createContext, useState } from 'react'
import SelectEditCategory from '../modal/upload/SelectEditCategory'
import SideBarTextOptions from './SideBarTextOptions'

const backPageMapper: Record<StateContext['page'], string> = {
  selectBlock: '',
  textOptions: 'Text',
}

const SideBar = () => {
  const { sideBar, page } = useUploadState()
  const { goSideBarPage, backSideBarPage, addBlock, closeSideBar } = useUploadDispatch()
  const items = [
    {
      name: 'Text',
      iconUrl: '/text.svg',
      next: true,
      onClick: () => {
        goSideBarPage('textOptions')
      },
    },
    {
      name: 'Image',
      iconUrl: '/image.svg',
      next: false,
      onClick: () => {
        addBlock('image')
      },
    },
  ]
  console.log('Side bar render')
  return (
    <>
      <div className="side-bar" ref={sideBar}>
        <div className="side-bar__header">
          {backPageMapper[page] !== '' ? (
            <div className="side-bar__header-back-button" onClick={backSideBarPage}>
              <Image src="arrowLeft.svg" width={13} height={13} alt="back" />
              {backPageMapper[page]}
            </div>
          ) : (
            <div></div>
          )}
          <Image src="/close.svg" width={20} height={20} alt="close" onClick={closeSideBar} />
        </div>

        <div className="side-bar-container">
          <div className="side-bar__main">
            <div className="side-bar__header desktop">
              <span onClick={closeSideBar}>Close</span>
            </div>
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
// className={`side-bar ${openSideBar ? 'open' : ''} ${transition ? 'transition' : ''}`}

export default SideBar
