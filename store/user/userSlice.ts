'use client'
import { IProject } from '@/app/page'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TFavorite = {
  _id: string
  project: IProject
}
export interface IUserInfo {
  favorites: Record<string, TFavorite>
  clipping: Record<string, null>
}
export interface UserState {
  email?: string
  name?: string
  role?: number
  accessToken?: string
  id: string
  favorites: Record<string, TFavorite>
}
const initialState: UserState = {
  email: '',
  name: '',
  role: -1,
  id: '',
  accessToken: '',
  favorites: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
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
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.favorites = action.payload.favorites
    },
    addFavorite: (state, action: PayloadAction<{ key: string; value: TFavorite }>) => {
      state.favorites[action.payload.key] = action.payload.value
    },
    deleteFavorite: (state, action: PayloadAction<{ key: string }>) => {
      delete state.favorites[action.payload.key]
    },
  },
})

export const { setUser, resetUser, setUserInfo, addFavorite, deleteFavorite } = userSlice.actions
export default userSlice.reducer
