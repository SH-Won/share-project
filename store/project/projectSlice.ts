import { IProject } from '@/app/page'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  projects: IProject[]
}
const initialState: InitialState = {
  projects: [],
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects.push(...action.payload)
    },
  },
})

export const { setProjects } = projectSlice.actions
export default projectSlice.reducer
