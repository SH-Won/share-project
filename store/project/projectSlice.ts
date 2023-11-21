import { IProject } from '@/app/page'
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
    limit: 10,
  },
  totalLength: Infinity,
  isInitialFetching: false,
  hasMore: true,
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
      if (typeof action.payload.totalLength !== 'undefined') {
        state.totalLength = action.payload.totalLength
        state.hasMore = action.payload.totalLength > state.projects.length
      }
    },
    addProject: (state, action: PayloadAction<IProject>) => {
      state.projects = [action.payload, ...state.projects]
    },
    updateProject: (state, action: PayloadAction<{ project: IProject; userId: string }>) => {
      //PayloadAction<IProject>
      const findIndex = state.projects.findIndex(
        (project) => project._id === action.payload.project._id
      )
      // state.projects.splice(findIndex, 1, action.payload)
      state.projects[findIndex].favoriteUsers.push(action.payload.userId)
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
