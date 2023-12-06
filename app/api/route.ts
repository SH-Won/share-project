import dbConnect from '@/lib/dbConnect'
import Favorite from '@/models/Favorite'
import Project from '@/models/Project'
import User from '@/models/User'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
interface Params {
  params: {
    skip: string
    limit: string
  }
}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const skip = searchParams.get('skip') || '0'
  const limit = searchParams.get('limit') || '10'
  try {
    const db = await dbConnect()
    // const totalFavoriteLength = await Favorite.collection.countDocuments()
    // console.log('totalFavoriteLength', totalFavoriteLength)

    // Promise.all(
    //   Array(20000)
    //     .fill(2)
    //     .map((el) => {
    //       return async () => {
    //         const favorite = await new Favorite({
    //           projectId: new mongoose.mongo.ObjectId(),
    //           userId: '656ddf60d0ecda1595c1fdd7',
    //         })
    //         await favorite.save()
    //       }
    //     })
    //     .map((func) => func())
    // )
    let totalLength
    if (skip === '0') {
      totalLength = await Project.collection.countDocuments()
    }
    const projects = await Project.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .select('-blocks')
      .populate({
        path: 'author',
        model: User,
        select: 'name imageUrl',
      })
      .sort({ $natural: -1 })
      .exec()
    return NextResponse.json({ projects: projects, totalLength })
  } catch (e) {
    return NextResponse.json({ message: e, success: false })
  }
}
