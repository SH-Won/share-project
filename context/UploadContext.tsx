'use client'
import InputBox from '@/components/common/InputBox'
import { useForm } from '@/hooks'
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
interface StateContext {
  openSideBar: boolean
  page: 'selectBlock' | 'textOptions'
  editBlocks: TEditBlock[]
  blockIndex: React.MutableRefObject<number>
}
interface DispatchContext {
  setOpenSideBar: Dispatch<SetStateAction<boolean>>
  setPage: Dispatch<SetStateAction<StateContext['page']>>
  addBlock: (blockType: TEditBlock['type']) => void
  reset: () => void
}
interface UploadContextProps {
  children: React.ReactElement | React.ReactElement[]
}

const UploadStateContext = createContext<StateContext | null>(null)
const UploadDispatchContext = createContext<DispatchContext | null>(null)

const UploadContext = ({ children }: UploadContextProps) => {
  const [page, setPage] = useState<StateContext['page']>('selectBlock')
  const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const [editBlocks, setEditBlocks] = useState<TEditBlock[]>([])
  const blockIndex = useRef<number>(0)
  const reset = useCallback(() => {
    setOpenSideBar(false)
    setPage('selectBlock')
  }, [])
  const addBlock = (blockType: TEditBlock['type']) => {
    const block = {
      type: blockType,
      name: blockType + '_' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      value: '',
    }
    console.log(block)
    console.log('index', blockIndex.current)
    const copyBlocks = [...editBlocks]
    copyBlocks.splice(blockIndex.current, 0, block)
    setEditBlocks(copyBlocks)
    reset()
  }
  const value = useMemo(() => {
    return {
      blockIndex,
      page,
      openSideBar,
      editBlocks,
    }
  }, [page, openSideBar, editBlocks])
  const dispatch = useMemo(() => {
    return {
      setPage,
      setOpenSideBar,
      reset,
      addBlock,
    }
  }, [setOpenSideBar, editBlocks, setPage])
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
