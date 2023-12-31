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
    limit: 20,
  },
  totalLength: Infinity,
  isInitialFetching: false,
  hasMore: false,
  isReadyToFetch: true,
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setProjects: (state, action: PayloadAction<Pick<InitialState, 'projects' | 'totalLength'>>) => {
      // state.projects = [...action.payload.projects, ...state.projects]
      state.projects.push(...action.payload.projects)
      // if (typeof action.payload.totalLength !== 'undefined') {
      //   state.totalLength = action.payload.totalLength
      // }
      // state.hasMore = state.totalLength >= state.projects.length
      state.hasMore = action.payload.totalLength >= 20
    },
    addProject: (state, action: PayloadAction<IProject>) => {
      state.projects = [action.payload, ...state.projects]
    },
    updateProject: (state, action: PayloadAction<{ projectId: string; isAdd: boolean }>) => {
      const findIndex = state.projects.findIndex(
        (project) => project._id === action.payload.projectId
      )
      // state.projects.splice(findIndex, 1, action.payload)
      // if (findIndex > -1) {
      //   if (action.payload.isAdd)
      //     state.projects[findIndex]!.favoriteUsers.push(action.payload.userId)
      //   else {
      //     const deleteIndex = state.projects[findIndex]!.favoriteUsers.findIndex(
      //       (user) => user === action.payload.userId
      //     )
      //     state.projects[findIndex].favoriteUsers.splice(deleteIndex, 1)
      //   }
      // }
      if (findIndex > -1) {
        action.payload.isAdd
          ? state.projects[findIndex].favoriteCount++
          : state.projects[findIndex].favoriteCount--
      }
    },
    setQuery: (state, action: PayloadAction<InitialState['query']>) => {
      state.query = action.payload
    },
    setReadyToFetch: (state, action: PayloadAction<boolean>) => {
      state.isReadyToFetch = action.payload
    },
  },
})

export const { setProjects, addProject, updateProject, setQuery, setLoading, setReadyToFetch } =
  projectSlice.actions
export default projectSlice.reducer
