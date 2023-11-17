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
      if (action.payload.totalLength) {
        state.totalLength = action.payload.totalLength
      }
    },
    addProject: (state, action: PayloadAction<IProject>) => {
      state.projects = [action.payload, ...state.projects]
    },
    updateProject: (state, action: PayloadAction<IProject>) => {
      const findIndex = state.projects.findIndex((project) => project._id === action.payload._id)
      state.projects.splice(findIndex, 1, action.payload)
    },
    setQuery: (state, action: PayloadAction<InitialState['query']>) => {
      state.query = action.payload
    },
  },
})

export const { setProjects, addProject, updateProject, setQuery, setLoading } = projectSlice.actions
export default projectSlice.reducer
