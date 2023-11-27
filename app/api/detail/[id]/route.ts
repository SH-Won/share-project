import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import UserInventory from '@/models/UserInventory'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  params: {
    id: string
  }
}
export async function GET(req: NextRequest, { params }: Params) {
  const id = params.id
  try {
    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res(1)
    //   }, 1000)
    // })
    // return NextResponse.json({ message: 'failed fetch', status: 400 }, { status: 400 })

    const db = await dbConnect()
    const project = await Project.find({ _id: id })
      .populate({
        path: 'author',
        model: UserInventory,
        select: 'name imageUrl',
      })
      .exec()
    const result = await Project.find({ author: project[0].author }).exec()
    const writerProjects = result.filter((project) => project._id.toString() !== id)
    return NextResponse.json({ project: project[0], writerProjects }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 501 })
  }
}
