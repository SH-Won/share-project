'use client'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

type ModalType = 'bottomSheet' | 'popup' | 'modal' | 'toast' | 'bottomModal'
export interface ModalStack {
  type: ModalType
  component: React.FC
  props: any
}
interface ModalState {
  modalStack: ModalStack[]
}
const initialState: ModalStack[] = []
export const ModalStateContext = createContext<ModalStack[]>(initialState)
export const ModalSetterContext = createContext<Dispatch<SetStateAction<ModalStack[]>> | null>(null)

const ModalContext = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState(initialState)

  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalSetterContext.Provider value={setModalState}>{children}</ModalSetterContext.Provider>
    </ModalStateContext.Provider>
  )
}

export default ModalContext
