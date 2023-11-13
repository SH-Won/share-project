import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { projectId, isAdd } = body
  try {
    const db = await dbConnect()
    const query = {
      $inc: {
        favoriteCount: isAdd ? 1 : -1,
      },
    }
    const project = await Project.findOneAndUpdate({ _id: projectId }, query, {
      new: true,
    })
      .populate({
        path: 'writer',
        model: User,
      })
      .exec()

    return NextResponse.json({ project }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
