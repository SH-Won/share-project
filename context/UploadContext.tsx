'use client'
import React, {
  createContext,
  Dispatch,
  Ref,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

type TEditBlock = {
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
  // setOpenSideBar: Dispatch<SetStateAction<boolean>>
  setPage: Dispatch<SetStateAction<StateContext['page']>>
  addBlock: (blockType: TEditBlock['type']) => void
  // reset: () => void
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
  // const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const [editBlocks, setEditBlocks] = useState<TEditBlock[]>([])
  const blockIndex = useRef<number>(0)
  const sideBar = useRef<HTMLDivElement>(null)
  // const reset = useCallback(() => {
  //   setOpenSideBar(false)
  //   setPage('selectBlock')
  // }, [])
  const addBlock = (blockType: TEditBlock['type']) => {
    const block = {
      type: blockType,
      name: blockType + '_' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      value: '',
    }
    const copyBlocks = [...editBlocks]
    copyBlocks.splice(blockIndex.current, 0, block)
    setEditBlocks(copyBlocks)
    // reset()
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
    setPage('selectBlock')
  }
  const openSideBar = () => {
    sideBar.current?.classList.add('open')
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
