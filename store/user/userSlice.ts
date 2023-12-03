'use client'
import { IProject } from '@/lib/network/types/project'
import { IUserInventory } from '@/lib/network/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TFavorite = {
  _id: string
  project: IProject
}
export interface UserState {
  loading: boolean
  email?: string
  name?: string
  role?: number
  accessToken?: string
  id: string
  favorites: Record<string, IProject>
  clippings: Record<string, IProject>
  imageUrl: string
  projects: IProject[]
}
const initialState: UserState = {
  loading: true,
  email: '',
  name: '',
  role: -1,
  id: '',
  accessToken: '',
  favorites: {},
  clippings: {},
  imageUrl: '/noImage.svg',
  projects: [],
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
      const clippings: UserState['clippings'] = {}
      action.payload.favorites.reverse().forEach((favorite) => {
        favorites[favorite._id] = favorite
      })
      action.payload.clippings.reverse().forEach((clipping) => {
        clippings[clipping._id] = clipping
      })
      state.name = action.payload.name
      state.favorites = favorites
      state.clippings = clippings
      state.projects = action.payload.projects.reverse()
      state.imageUrl = action.payload.imageUrl
    },
    addFavorite: (state, action: PayloadAction<IProject>) => {
      // state.favorites[action.payload._id] = action.payload
      state.favorites = {
        [action.payload._id]: action.payload,
        ...state.favorites,
      }
    },
    deleteFavorite: (state, action: PayloadAction<{ key: string }>) => {
      delete state.favorites[action.payload.key]
    },
    addClipping: (state, action: PayloadAction<IProject>) => {
      // state.clippings[action.payload._id] = action.payload
      state.clippings = {
        [action.payload._id]: action.payload,
        ...state.clippings,
      }
    },
    deleteClipping: (state, action: PayloadAction<{ key: string }>) => {
      delete state.clippings[action.payload.key]
    },
    addUserProjects: (state, action: PayloadAction<IProject>) => {
      state.projects = [action.payload, ...state.projects]
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
  addClipping,
  deleteClipping,
  addUserProjects,
  updateUserImage,
} = userSlice.actions
export default userSlice.reducer
