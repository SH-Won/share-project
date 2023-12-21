import Query from '@/lib/action-query'
import dbConnect from '@/lib/dbConnect'
import { IProject } from '@/lib/network/types/project'
import Favorite from '@/models/Favorite'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import mongoose from 'mongoose'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
interface Params {
  params: {
    userId: string
  }
}
// export const revalidate = 0
// export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: Params) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') || '1'
  const userId = searchParams.get('userId') || null
  // const sessionId = searchParams.get('sessionId') || null
  const sessionId = token?.id || null
  try {
    const db = await dbConnect()
    const favorites = await UserInventory.aggregate(
      Query.USER_FAVORITE_PROJECT(sessionId!, userId!, parseInt(page))
    )

    if (!favorites.length) {
      return NextResponse.json(
        {
          projects: [],
          projectLength: 0,
        },
        { status: 200 }
      )
    }
    // if (userId !== sessionId) {
    //   const appearProjects = favorites[0].projects.filter((project: IProject) => !project.isHidden)
    //   const hiddenProjectCount = favorites[0].projects.length - appearProjects.length
    //   return NextResponse.json(
    //     {
    //       projects: appearProjects || [],
    //       projectLength: favorites[0].totalFavoriteCount - hiddenProjectCount || 0,
    //     },
    //     { status: 200 }
    //   )
    // }
    // return NextResponse.json(
    //   {
    //     projects: favorites[0].projects,
    //     projectLength: favorites[0].totalFavoriteCount,
    //   },
    //   { status: 200 }
    // )
    // const appearProjects = favorites[0].projects.filter((project: IProject) => !project.isHidden)
    const appearProjects = favorites[0].projects.map((project: IProject) => {
      if (!project.isHidden) return project
      project.thumbnail.imageUrl = '/noImage.svg'
      project.author.imageUrl = '/noImage.svg'
      return project
    })
    const hiddenProjectCount = favorites[0].projects.length - appearProjects.length
    return NextResponse.json(
      {
        projects: appearProjects || [],
        // projectLength: favorites[0].totalFavoriteCount - hiddenProjectCount || 0,
        projectLength: favorites[0].totalFavoriteCount,
      },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
export async function PUT(req: NextRequest, { params }: Params) {
  // const userId = params.userId
  const body = await req.json()
  const { projectId, isAdd } = body
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const userId = token?.id

  try {
    const db = await dbConnect()
    const userInventoryField = { favorites: projectId }
    const userQuery = isAdd
      ? { $addToSet: userInventoryField, $inc: { totalFavoriteCount: 1 } }
      : { $pull: userInventoryField, $inc: { totalFavoriteCount: -1 } }
    const projectQuery = isAdd ? { $inc: { favoriteCount: 1 } } : { $inc: { favoriteCount: -1 } }
    const [updatedUserInventory, updatedProject] = await Promise.all(
      [
        () =>
          UserInventory.findOneAndUpdate({ _id: userId }, userQuery, {
            new: true,
          })
            // .populate({
            //   path: 'favorites',
            //   populate: {
            //     path: 'writer',
            //     model: User,
            //   },
            //   model: Project,
            // })
            .exec(),
        () =>
          Project.findOneAndUpdate({ _id: projectId }, projectQuery, {
            new: true,
          })
            // .populate({
            //   path: 'writer',
            //   model: User,
            // })
            .exec(),
      ].map((func) => func())
    )
    if (!updatedUserInventory || !updatedProject) {
      return NextResponse.json({ error: 'failed' }, { status: 400 })
    }
    // console.log(updatedUserInventory, updatedProject)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
