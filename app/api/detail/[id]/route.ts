import dbConnect from '@/lib/dbConnect'
import { IProject } from '@/lib/network/types/project'
import Clipping from '@/models/Clipping'
import Favorite from '@/models/Favorite'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
// export const dynamic = 'force-dynamic'
interface Params {
  params: {
    id: string
  }
}
interface IDetailProject extends IProject {
  isUserFavorite: boolean
  isUserClipping: boolean
}
export async function GET(request: NextRequest, { params }: Params) {
  const id = params.id
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const userId = token?.id
  try {
    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res(1)
    //   }, 1000)
    // })
    // return NextResponse.json({ message: 'failed fetch', status: 400 }, { status: 400 })

    const db = await dbConnect()
    const [project, isUserFavorite, isUserClipping] = (await Promise.all(
      [
        async () => {
          const project = await Project.findOne({ _id: id })
            .populate({
              path: 'author',
              model: User,
              select: 'name imageUrl',
            })
            .exec()
          return project
        },
        async () => {
          if (!userId) return false
          else {
            const userFavorite = await Favorite.findOne({ projectId: id, userId })
            return userFavorite ? true : false
          }
        },
        async () => {
          if (!userId) return false
          else {
            const userClipping = await Clipping.findOne({ projectId: id, userId })
            return userClipping ? true : false
          }
        },
      ].map((func) => func())
    )) as [IProject, boolean, boolean]
    // const project = await Project.find({ _id: id })
    //   .populate({
    //     path: 'author',
    //     model: User,
    //     select: 'name imageUrl',
    //   })
    //   .exec()
    // const isUserFavorite = await Favorite.findOne({_id : id})
    const result = await Project.find({ author: project.author }).select('-blocks').exec()
    const writerProjects = result.filter((project) => project._id.toString() !== id)
    return NextResponse.json(
      { project, writerProjects, isUserFavorite, isUserClipping },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 501 })
  }
}
