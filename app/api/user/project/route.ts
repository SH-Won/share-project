import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const skip = searchParams.get('skip') || '0'
  const limit = searchParams.get('limit') || '10'
  // const userId = searchParams.get('userId') || null
  const userId = request.headers.get('Authorization')
  console.log(userId)
  // const userId = searchParams.
  try {
    const db = await dbConnect()
    const projects = await Project.find({ author: userId })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .select('-blocks')
      // .populate({
      //   path: 'author',
      //   model: User,
      //   select: 'name imageUrl',
      // })
      .sort({ $natural: -1 })
      .exec()

    return NextResponse.json({ projects, projectLength: projects.length }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
