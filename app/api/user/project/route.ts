import Query from '@/lib/action-query'
import dbConnect from '@/lib/dbConnect'
import { IProject } from '@/lib/network/types/project'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'

import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
interface Params {
  params: {
    userId: string
  }
}
// export const revalidate = 0
// export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest, response: NextApiResponse) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  // const token = await getServerSession(authOptions)
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') || '1'
  const userId = searchParams.get('userId') || null
  // const sessionId = searchParams.get('sessionId') || null
  const sessionId = token?.id || null
  try {
    const db = await dbConnect()
    const projects = await UserInventory.aggregate(
      Query.USER_PROJECT_PROCESS(sessionId!, userId!, parseInt(page))
    )
    // const projects = await Project.find(query)
    //   // .skip(parseInt(skip))
    //   // .limit(parseInt(limit))
    //   .skip(0)
    //   .limit(20)
    //   .select('-blocks')
    //   // .populate({
    //   //   path: 'author',
    //   //   model: User,
    //   //   select: 'name imageUrl',
    //   // })
    //   .sort({ $natural: -1 })
    //   .exec()
    if (!projects.length) {
      return NextResponse.json(
        {
          projects: [],
          projectLength: 0,
        },
        { status: 200 }
      )
    }
    // const response = JSON.parse(JSON.stringify(projects[0]))
    if (userId !== sessionId) {
      const appearProjects = projects[0].projects.filter((project: IProject) => !project.isHidden)
      const hiddenProjectCount = projects[0].projects.length - appearProjects.length
      return NextResponse.json(
        {
          projects: appearProjects || [],
          projectLength: projects[0].totalProjectCount - hiddenProjectCount || 0,
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { projects: projects[0].projects || [], projectLength: projects[0].totalProjectCount || 0 },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
export async function PUT(request: NextRequest) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    const body = await request.json()
    const { projectId, isHidden } = body
    const hiddenField = isHidden ? { isHidden: true } : { isHidden: false }
    const projectQuery = { $set: hiddenField }

    const project = await Project.findOneAndUpdate({ _id: projectId }, projectQuery, { new: true })
    return NextResponse.json(
      {
        project,
      },
      {
        status: 200,
      }
    )
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
