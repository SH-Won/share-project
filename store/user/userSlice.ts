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
  imageUrl: string
}
export interface UserState {
  loading: boolean
  email?: string
  name?: string
  role?: number
  accessToken?: string
  id: string
  favorites: Record<string, IProject>
  imageUrl: string
}
const initialState: UserState = {
  loading: true,
  email: '',
  name: '',
  role: -1,
  id: '',
  accessToken: '',
  favorites: {},
  imageUrl: 'noImage.svg',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
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
      state.imageUrl = action.payload.imageUrl
    },
    addFavorite: (state, action: PayloadAction<IProject>) => {
      state.favorites[action.payload._id] = action.payload
    },
    deleteFavorite: (state, action: PayloadAction<{ key: string }>) => {
      delete state.favorites[action.payload.key]
    },
    updateUserImage: (state, action: PayloadAction<IUserInventory['imageUrl']>) => {
      state.imageUrl = action.payload
    },
  },
})

export const {
  setLoading,
  setUser,
  resetUser,
  setUserInfo,
  addFavorite,
  deleteFavorite,
  updateUserImage,
} = userSlice.actions
export default userSlice.reducer
