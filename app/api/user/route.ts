import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInfo from '@/models/UserInfo'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const favoriteId = req.nextUrl.searchParams.get('favoriteId')
  try {
    const db = await dbConnect()
    console.log('user info', favoriteId)
    const userInfo = await UserInfo.findOne({ _id: favoriteId })
      .populate({
        path: 'favorites.$*.project',
        populate: {
          path: 'writer',
          model: User,
        },
        model: Project,
      })
      .exec()
    console.log(userInfo)

    // db.disconnect()
    return NextResponse.json({ userInfo: userInfo }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: 'error' }, { status: 500 })
  }
}
