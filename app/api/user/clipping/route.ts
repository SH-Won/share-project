import dbConnect from '@/lib/dbConnect'
import Clipping from '@/models/Clipping'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import { NextRequest, NextResponse } from 'next/server'
// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams
//   const skip = searchParams.get('skip') || '5'
//   const limit = searchParams.get('limit') || '5'
//   const userId = req.headers.get('Authorization')
//   // const userInventory = await UserInventory.findOne({_id : userId})
// }
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const skip = searchParams.get('skip') || '0'
  const limit = searchParams.get('limit') || '10'
  // const userId = searchParams.get('userId') || null
  const userId = request.headers.get('Authorization')
  // const userId = searchParams.
  try {
    const db = await dbConnect()
    const clippings = await Clipping.find({ userId })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .select('userId')
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
      .sort({ $natural: -1 })
      .exec()
    const projects = clippings.map((clipping) => clipping.projectId)

    return NextResponse.json({ projects, projectLength: projects.length }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { projectId, userId, isAdd } = body
  try {
    const db = await dbConnect()
    // const field = { clippings: projectId }
    // const query = isAdd ? { $push: field } : { $pull: field }
    // const userInventory = await UserInventory.findOneAndUpdate({ _id: userId }, query, {
    //   new: true,
    // })
    const userClippingQuery = {
      projectId,
      userId,
    }
    if (isAdd) {
      const userFavorite = await new Clipping(userClippingQuery)
      await userFavorite.save()
    } else {
      await Clipping.findOneAndDelete(userClippingQuery)
    }
    // .populate({
    //   path: 'favorites',
    //   populate: {
    //     path: 'writer',
    //     model: User,
    //   },
    //   model: Project,
    // })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
