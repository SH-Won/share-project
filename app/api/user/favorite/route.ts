import dbConnect from '@/lib/dbConnect'
import UserInfo from '@/models/UserInfo'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { projectId, favoriteId, isAdd } = body
  try {
    const db = await dbConnect()
    const field = `favorites.${projectId}`
    const query: { [key: string]: { project: string } } = {}
    console.log(isAdd)
    query[field] = isAdd
      ? {
          project: projectId,
        }
      : {
          project: 1,
        }
    const userInfo = await UserInfo.findOneAndUpdate(
      { _id: favoriteId },
      isAdd
        ? {
            $set: query,
          }
        : {
            $unset: query,
          },
      {
        new: true,
      }
    )
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
