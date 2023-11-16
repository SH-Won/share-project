import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  try {
    const db = await dbConnect()
    const userInventory = await UserInventory.findOne({ _id: userId })
      .populate({
        path: 'favorites',
        populate: {
          path: 'writer',
          model: User,
        },
        model: Project,
      })
      .exec()

    // db.disconnect()
    return NextResponse.json({ userInventory: userInventory }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: 'error' }, { status: 500 })
  }
}
