import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { projectId, userId, isAdd } = body
  try {
    const db = await dbConnect()
    const field = { clippings: projectId }
    const query = isAdd ? { $push: field } : { $pull: field }
    const userInventory = await UserInventory.findOneAndUpdate({ _id: userId }, query, {
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
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
