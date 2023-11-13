'use client'
import { IProject } from '@/app/page'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TFavorite = {
  _id: string
  project: IProject
}
export interface IUserInventory {
  _id: string
  favorites: IProject[]
  clipping: string[]
}
export interface UserState {
  email?: string
  name?: string
  role?: number
  accessToken?: string
  id: string
  favorites: Record<string, IProject>
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
    setUserInfo: (state, action: PayloadAction<IUserInventory>) => {
      const favorites: UserState['favorites'] = {}
      action.payload.favorites.forEach((favorite) => {
        favorites[favorite._id] = favorite
      })
      state.favorites = favorites
    },
    addFavorite: (state, action: PayloadAction<IProject>) => {
      state.favorites[action.payload._id] = action.payload
    },
    deleteFavorite: (state, action: PayloadAction<{ key: string }>) => {
      delete state.favorites[action.payload.key]
    },
  },
})

export const { setUser, resetUser, setUserInfo, addFavorite, deleteFavorite } = userSlice.actions
export default userSlice.reducer
