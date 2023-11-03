'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  email?: string
  name?: string
  role?: number
  accessToken?: string
}
const initialState: UserState = {
  email: '',
  name: '',
  role: -1,
  accessToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log(action.payload)
      state = {
        ...state,
        ...action.payload,
      }
      return state
    },
    resetUser: (state) => {
      state = initialState
      return state
    },
  },
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
