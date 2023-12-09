'use server'

import { IUserProjectQuery } from './network/user'
import dbConnect from './dbConnect'
import UserInventory from '@/models/UserInventory'
import { IProject } from './network/types/project'
import Query from './action-query'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { headers } from 'next/headers'
import BackEnd from './network'
export const getUserProjects = async (query: IUserProjectQuery) => {
  const session = await getServerSession(authOptions)
  const page = query.page
  const userId = query.userId
  query.sessionId = session!.id
  try {
    const db = await dbConnect()
    // const projects = await UserInventory.aggregate(
    //   Query.USER_PROJECT_PROCESS(session!.id, userId!, page!)
    // )
    // if (!projects.length) {
    //   return {
    //     projects: [],
    //     projectLength: 0,
    //   }
    // }
    // const response = JSON.parse(JSON.stringify(projects[0]))
    const response = await BackEnd.getInstance().user.getUserProjects(query)

    return {
      projects: response.projects || [],
      projectLength: response.projectLength || 0,
    } as { projects: IProject[]; projectLength: number }
  } catch (e) {
    throw new Error('error')
  }
}
export const getUserFavoriteProjects = async (query: IUserProjectQuery) => {
  const session = await getServerSession(authOptions)
  const page = query.page
  const userId = query.userId
  query.sessionId = session!.id
  try {
    const db = await dbConnect()
    // const projects = await UserInventory.aggregate(
    //   Query.USER_FAVORITE_PROJECT(session!.id, userId!, page!)
    // )
    const response = await BackEnd.getInstance().user.getUserFavorites(query)
    // if (!projects.length) {
    //   return {
    //     projects: [],
    //     projectLength: 0,
    //   }
    // }
    // const response = JSON.parse(JSON.stringify(projects[0]))

    return {
      projects: response.projects || [],
      projectLength: response.projectLength || 0,
    } as { projects: IProject[]; projectLength: number }
  } catch (e) {
    return {
      projects: [],
      projectLength: 0,
    }
  }
}
export const getUserClippingProjects = async (query: IUserProjectQuery) => {
  const session = await getServerSession(authOptions)
  const page = query.page
  const userId = query.userId
  query.sessionId = session!.id
  try {
    const db = await dbConnect()
    // const projects = await UserInventory.aggregate(Query.USER_CLIPPING_PROJECT(session!.id, page!))
    // if (!projects.length) {
    //   return {
    //     projects: [],
    //     projectLength: 0,
    //   }
    // }
    // const response = JSON.parse(JSON.stringify(projects[0]))
    const response = await BackEnd.getInstance().user.getUserClipping(query)
    return {
      projects: response.projects || [],
      projectLength: response.projectLength || 0,
    } as { projects: IProject[]; projectLength: number }
  } catch (e) {
    console.log(e)
    throw new Error('error')
  }
}
