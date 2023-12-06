import { IProject } from '@/lib/network/types/project'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  loading: boolean
  projects: IProject[]
  query: {
    skip: number
    limit: number
  }
  totalLength: number
  isInitialFetching: boolean
  hasMore: boolean
  isReadyToFetch: boolean
}
const initialState: InitialState = {
  loading: true,
  projects: [],
  query: {
    skip: 0,
    limit: 2,
  },
  totalLength: Infinity,
  isInitialFetching: false,
  hasMore: false,
  isReadyToFetch: true,
}

const userProjectSlice = createSlice({
  name: 'userProjects',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setProjects: (state, action: PayloadAction<Pick<InitialState, 'projects' | 'totalLength'>>) => {
      // state.projects = [...action.payload.projects, ...state.projects]
      state.projects.push(...action.payload.projects)
      if (typeof action.payload.totalLength !== 'undefined') {
        console.log('total length', action.payload.totalLength)
        state.totalLength = action.payload.totalLength
      }
      state.hasMore = state.totalLength > state.projects.length
    },

    setQuery: (state, action: PayloadAction<InitialState['query']>) => {
      state.query = action.payload
    },
    setReadyToFetch: (state, action: PayloadAction<boolean>) => {
      state.isReadyToFetch = action.payload
    },
  },
})

export const { setProjects, setQuery, setLoading, setReadyToFetch } = userProjectSlice.actions
export default userProjectSlice.reducer
