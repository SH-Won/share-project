import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    id: string
  }
}
export async function GET(req: NextApiRequest, { params }: Params) {
  const id = params.id
  try {
    const db = await dbConnect()
    const project = await Project.find({ _id: id })
      .populate({
        path: 'writer',
        model: User,
      })
      .exec()
    const result = await Project.find({ writer: project[0].writer }).exec()
    const writerProjects = result.filter((project) => project._id.toString() !== id)
    db?.disconnect()
    return NextResponse.json({ project: project[0], writerProjects }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 501 })
  }
}
