import dbConnect from '@/lib/dbConnect'
import Favorite from '@/models/Favorite'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const skip = searchParams.get('skip') || '0'
  const limit = searchParams.get('limit') || '10'
  // const userId = searchParams.get('userId') || null
  const createdAt = searchParams.get('lastCreatedAt')
  const userId = request.headers.get('Authorization')
  const query = !createdAt
    ? {
        userId,
      }
    : {
        userId,
        createdAt: { $lt: createdAt },
      }
  try {
    const db = await dbConnect()
    const favorites = await Favorite.find(query)
      .sort({ createdAt: -1 })
      // .skip(parseInt(skip))
      // .limit(parseInt(limit))
      .skip(0)
      .limit(20)
      .select('-userId')
      .populate({
        path: 'projectId',
        model: Project,
        select: '-blocks',
        populate: {
          path: 'author',
          model: User,
          select: 'name imageUrl',
        },
      })
      .exec()
    let lastCreatedAt = null
    if (favorites.length) {
      lastCreatedAt = favorites.at(-1)!.createdAt
    }

    const projects = favorites.map((favorite) => favorite.projectId).filter((el) => !!el)

    return NextResponse.json(
      { projects, projectLength: projects.length, lastCreatedAt },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { projectId, userId, isAdd } = body
  try {
    const db = await dbConnect()
    const projectQuery = isAdd ? { $inc: { favoriteCount: 1 } } : { $inc: { favoriteCount: -1 } }
    const inventoryQuery = isAdd
      ? { $inc: { totalFavoriteCount: 1 } }
      : { $inc: { totalFavoriteCount: -1 } }
    const userFavoriteQuery = {
      projectId,
      userId,
    }
    const error = false
    if (isAdd) {
      const userFavorite = await new Favorite(userFavoriteQuery)
      await userFavorite.save()
      if (!userFavorite) return NextResponse.json({ error: 'failed' }, { status: 400 })
      await Project.findOneAndUpdate({ _id: projectId }, projectQuery, { new: true })
      // await Project.findOneAndUpdate({ _id: projectId }, projectQuery, { new: true })
    } else {
      await Favorite.findOneAndDelete(userFavoriteQuery).exec()

      await Project.findOneAndUpdate({ _id: projectId }, projectQuery, { new: true })
    }
    if (error) {
      return NextResponse.json({ error: 'failed' }, { status: 400 })
    }
    // if (!updatedUserInventory || !updatedProject) {
    //   return NextResponse.json({ error: 'failed' }, { status: 400 })
    // }
    // console.log(updatedUserInventory, updatedProject)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
