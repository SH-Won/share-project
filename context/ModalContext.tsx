'use client'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

type ModalType = 'bottomSheet' | 'basic' | 'modal'
export type TModalState = {
  type: ModalType
  Component: React.FC<any>
  props: any
}
// interface ModalState {
//   modalStack: ModalState[]
// }
// const initialState: ModalStack[] = []
export const ModalStateContext = createContext<TModalState>({} as TModalState)
export const ModalSetterContext = createContext<Dispatch<SetStateAction<TModalState>> | null>(null)

const ModalContext = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState({} as TModalState)

  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalSetterContext.Provider value={setModalState}>{children}</ModalSetterContext.Provider>
    </ModalStateContext.Provider>
  )
}

export default ModalContext
