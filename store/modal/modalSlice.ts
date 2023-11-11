import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ModalType = 'bottomSheet' | 'popup' | 'modal' | 'toast' | 'bottomModal'
export interface ModalStack {
  type: ModalType
  // componentName?: string
  component: React.FC
  props: any
}
interface ModalState {
  modalStack: ModalStack[]
}

const initialState: ModalState = {
  modalStack: [],
}
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    pushModal: (state, action: PayloadAction<ModalStack>) => {
      state.modalStack = [...state.modalStack, action.payload]
      return state
    },
    closeModal: (state) => {
      state.modalStack = [...state.modalStack.slice(1)]
      return state
    },
  },
})
export const { pushModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
