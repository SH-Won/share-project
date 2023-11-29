'use client'
import { IModalState, TModalKey } from '@/components/modal/config'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

type TCoustomModal = 'bottomSheet' | 'basic' | 'modal'
export interface ICustomModalState {
  type: TCoustomModal
  Component: React.FC<any>
  props: any
}

interface IModalStateContext {
  customModalState: ICustomModalState
  modalState: IModalState<TModalKey>[]
}
interface IModalDispatchContext {
  setCustomModalState: Dispatch<SetStateAction<IModalStateContext['customModalState']>>
  setModalState: Dispatch<SetStateAction<IModalStateContext['modalState']>>
}

export const ModalStateContext = createContext<IModalStateContext>({} as IModalStateContext)
export const ModalSetterContext = createContext<IModalDispatchContext>({} as IModalDispatchContext)

const ModalContext = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<IModalStateContext['modalState']>([])
  const [customModalState, setCustomModalState] = useState<IModalStateContext['customModalState']>(
    {} as IModalStateContext['customModalState']
  )
  return (
    <ModalStateContext.Provider value={{ modalState, customModalState }}>
      <ModalSetterContext.Provider value={{ setModalState, setCustomModalState }}>
        {children}
      </ModalSetterContext.Provider>
    </ModalStateContext.Provider>
  )
}

export default ModalContext
