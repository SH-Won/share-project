import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // const userId = req.nextUrl.searchParams.get('userId')
  // const userId = req.headers.get('Authorization')
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId')
  try {
    const db = await dbConnect()
    const user = await User.findOne({ _id: userId }).select('name imageUrl')

    // const userInventory = await UserInventory.findOne(
    //   { _id: userId }
    //   // {
    //   //   favorites: { $slice: [0, 5] },
    //   //   clippings: { $slice: [0, 5] },
    //   // }
    // )
    //   .populate([
    //     {
    //       path: 'favorites',
    //       populate: {
    //         path: 'author',
    //         model: User,
    //         select: 'name imageUrl',
    //       },
    //       model: Project,
    //       // perDocumentLimit: 5,
    //     },
    //     {
    //       path: 'clippings',
    //       populate: {
    //         path: 'author',
    //         model: User,
    //         select: 'name imageUrl',
    //       },
    //       model: Project,
    //       // perDocumentLimit: 5,
    //     },
    //     {
    //       path: 'projects',
    //       model: Project,
    //       select: '-blocks',
    //     },
    //   ])
    //   .exec()
    // return NextResponse.json({ userInventory: userInventory }, { status: 200 })
    return NextResponse.json({ user }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: 'error' }, { status: 500 })
  }
}
