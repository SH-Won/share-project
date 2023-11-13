import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // const path = request.nextUrl.searchParams

  try {
    const db = await dbConnect()
    const projects = await Project.find()
      .populate({
        path: 'writer',
        model: User,
      })
      .exec()
    // await db?.()
    console.log('product call')
    // await db.disconnect()
    return NextResponse.json({ projects })
  } catch (e) {
    console.log('error')
    return NextResponse.json({ message: e, success: false })
  }
}
