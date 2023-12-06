import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const skip = searchParams.get('skip') || '0'
  const limit = searchParams.get('limit') || '10'
  // const userId = searchParams.get('userId') || null
  const createdAt = searchParams.get('lastCreatedAt')
  const userId = request.headers.get('Authorization') || searchParams.get('userId')
  const query = !createdAt
    ? {
        author: userId,
      }
    : {
        author: userId,
        createdAt: { $lt: createdAt },
      }
  // const userId = searchParams.
  try {
    const db = await dbConnect()
    const projects = await Project.find(query)
      // .skip(parseInt(skip))
      // .limit(parseInt(limit))
      .skip(0)
      .limit(20)
      .select('-blocks')
      // .populate({
      //   path: 'author',
      //   model: User,
      //   select: 'name imageUrl',
      // })
      .sort({ $natural: -1 })
      .exec()

    let lastCreatedAt = null
    if (projects.length) {
      lastCreatedAt = projects.at(-1)!.createdAt
    }
    return NextResponse.json(
      { projects, projectLength: projects.length, lastCreatedAt },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
