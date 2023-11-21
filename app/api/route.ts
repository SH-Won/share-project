import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
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
  // const path = request.nextUrl.searchParams
  try {
    const db = await dbConnect()
    let totalLength
    if (skip === '0') {
      totalLength = await Project.collection.countDocuments()
    }
    const projects = await Project.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      // .select('-favoriteUsers')
      .populate({
        path: 'author',
        model: UserInventory,
        select: 'name imageUrl',
      })
      .sort({ $natural: -1 })
      .exec()
    // await db.disconnect()
    console.log(totalLength)
    return NextResponse.json({ projects: projects, totalLength: totalLength || 0 })
  } catch (e) {
    return NextResponse.json({ message: e, success: false })
  }
}
