'use client'
import { useCloseEvent } from '@/hooks'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

export type TEditBlock = {
  type: 'heading' | 'textArea' | 'image'
  name: string
  value: string
  key?: string
}
export interface StateContext {
  // openSideBar: boolean
  page: 'selectBlock' | 'textOptions'
  editBlocks: TEditBlock[]
  blockIndex: React.MutableRefObject<number>
  sideBar: React.MutableRefObject<HTMLDivElement | null>
}
interface DispatchContext {
  openSideBar: () => void
  closeSideBar: () => void
  goSideBarPage: (page: StateContext['page']) => void
  backSideBarPage: () => void
  setPage: Dispatch<SetStateAction<StateContext['page']>>
  setInitialBlocks: (blocks: TEditBlock[]) => void
  addBlock: (blockType: TEditBlock['type']) => void
  moveUpBlock: (name: TEditBlock['name']) => void
  moveDownBlock: (name: TEditBlock['name']) => void
  pasteBlock: (name: TEditBlock['name']) => void
  deleteBlock: (name: TEditBlock['name']) => void
}
interface UploadContextProps {
  children: React.ReactElement | React.ReactElement[]
}

const UploadStateContext = createContext<StateContext | null>(null)
const UploadDispatchContext = createContext<DispatchContext | null>(null)

const UploadContext = ({ children }: UploadContextProps) => {
  const [page, setPage] = useState<StateContext['page']>('selectBlock')
  const [editBlocks, setEditBlocks] = useState<TEditBlock[]>([])
  const blockIndex = useRef<number>(0)
  const sideBar = useRef<HTMLDivElement>(null)
  // const { container: sideBar } = useCloseEvent({
  //   callback: () => {
  //     sideBar.current?.classList.remove('open')
  //     sideBar.current?.classList.remove('transition')
  //     setPage('selectBlock')
  //   },
  // })
  const setInitialBlocks = (blocks: TEditBlock[]) => {
    setEditBlocks(blocks)
  }
  const addBlock = (blockType: TEditBlock['type']) => {
    const block = {
      type: blockType,
      name: blockType + '_' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      value: '',
    }
    const copyBlocks = [...editBlocks]
    copyBlocks.splice(blockIndex.current, 0, block)
    setEditBlocks(copyBlocks)
    closeSideBar()
  }
  const moveUpBlock = (name: TEditBlock['name']) => {
    const index = editBlocks.findIndex((el) => el.name === name)
    if (index === 0) return
    const copyBlocks = [...editBlocks]
    ;[copyBlocks[index], copyBlocks[index - 1]] = [copyBlocks[index - 1], copyBlocks[index]]
    setEditBlocks(copyBlocks)
  }
  const moveDownBlock = (name: TEditBlock['name']) => {
    const index = editBlocks.findIndex((el) => el.name === name)
    if (index === editBlocks.length - 1) return
    const copyBlocks = [...editBlocks]
    ;[copyBlocks[index], copyBlocks[index + 1]] = [copyBlocks[index + 1], copyBlocks[index]]
    setEditBlocks(copyBlocks)
  }
  const pasteBlock = (name: TEditBlock['name']) => {
    const index = editBlocks.findIndex((el) => el.name === name)
    const blockType = editBlocks[index].type
    const block = {
      type: blockType,
      name: blockType + '_' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      value: '',
    }
    const copyBlocks = [...editBlocks]
    copyBlocks.splice(index + 1, 0, block)
    setEditBlocks(copyBlocks)
  }
  const deleteBlock = (name: TEditBlock['name']) => {
    const index = editBlocks.findIndex((el) => el.name === name)
    const copyBlocks = [...editBlocks]
    copyBlocks.splice(index, 1)
    setEditBlocks(copyBlocks)
  }

  const closeSideBar = () => {
    sideBar.current?.classList.remove('open')
    sideBar.current?.classList.remove('transition')
    // document.body.style.removeProperty('overflow')
    setPage('selectBlock')
  }
  const openSideBar = () => {
    sideBar.current?.classList.add('open')
    // document.body.style.setProperty('overflow', 'hidden')
  }
  const goSideBarPage = (page: StateContext['page']) => {
    sideBar.current?.classList.add('transition')
    setPage(page)
  }
  const backSideBarPage = () => {
    sideBar.current?.classList.remove('transition')
    setPage('selectBlock')
  }

  const value = useMemo(() => {
    return {
      blockIndex,
      page,
      editBlocks,
      sideBar,
    }
  }, [page, editBlocks])
  const dispatch = useMemo(() => {
    return {
      setPage,
      // setOpenSideBar,
      // reset,
      setInitialBlocks,
      addBlock,
      moveUpBlock,
      moveDownBlock,
      pasteBlock,
      deleteBlock,
      openSideBar,
      closeSideBar,
      goSideBarPage,
      backSideBarPage,
    }
  }, [editBlocks])
  return (
    <UploadStateContext.Provider value={value}>
      <UploadDispatchContext.Provider value={dispatch}>{children}</UploadDispatchContext.Provider>
    </UploadStateContext.Provider>
  )
}
export const useUploadState = () => {
  const state = useContext(UploadStateContext)
  if (!state) {
    throw Error('state is not initilized')
  }
  return state
}
export const useUploadDispatch = () => {
  const dispatch = useContext(UploadDispatchContext)
  if (!dispatch) {
    throw Error('upload dispather is not initialized')
  }
  return dispatch
}

export default UploadContext
