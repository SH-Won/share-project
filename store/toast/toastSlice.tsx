import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IToastItem {
  id: string
  type: 'success' | 'error' | 'notification'
  text: string
}
export interface IToastState {
  toastItems: IToastItem[]
}

const initialState: IToastState = {
  toastItems: [],
}
export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<IToastItem>) => {
      state.toastItems.push(action.payload)
    },
    popToast: (state) => {
      // state.toastItems = action.payload
      console.log(state.toastItems)
      state.toastItems.splice(0, 1)
    },
  },
})
export const { addToast, popToast } = toastSlice.actions
export default toastSlice.reducer
