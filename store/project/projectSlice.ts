import { IProject } from '@/app/page'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  loading: boolean
  projects: IProject[]
  isInitialFetching: boolean
}
const initialState: InitialState = {
  loading: true,
  projects: [],
  isInitialFetching: false,
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects.push(...action.payload)
      state.isInitialFetching = true
    },
    addProject: (state, action: PayloadAction<IProject>) => {
      state.projects = [action.payload, ...state.projects]
    },
    updateProject: (state, action: PayloadAction<IProject>) => {
      const findIndex = state.projects.findIndex((project) => project._id === action.payload._id)
      state.projects.splice(findIndex, 1, action.payload)
    },
  },
})

export const { setProjects, addProject, updateProject } = projectSlice.actions
export default projectSlice.reducer
