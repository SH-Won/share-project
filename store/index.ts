'use client'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import modalReducer from './modal/modalSlice'
import projectReducer from './project/projectSlice'
import toastReducer from './toast/toastSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    project: projectReducer,
    toast: toastReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
