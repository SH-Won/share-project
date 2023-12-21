import dbConnect from '@/lib/dbConnect'
import { IProject } from '@/lib/network/types/project'
import Clipping from '@/models/Clipping'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import mongoose from 'mongoose'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
interface Params {
  params: {
    userId: string
  }
}
export const revalidate = 0
export const dynamic = 'force-dynamic'
const getProcess = (sessionId: string, userId: string, page: string) => {
  return sessionId
    ? [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId!),
          },
        },
        {
          $project: {
            clippings: { $reverseArray: '$clippings' }, // favorites 배열을 역순으로 정렬
            totalClippingCount: 1,
          },
        },
        {
          $unwind: '$clippings', // 배열 풀기
        },
        {
          $skip: (parseInt(page) - 1) * 20,
        },
        {
          $limit: 20,
        },
        {
          $lookup: {
            from: 'projects',
            localField: 'clippings',
            foreignField: '_id',
            as: 'projects',
          },
        },
        {
          $unwind: '$projects', // 배열 풀기
        },
        {
          $lookup: {
            from: 'users',
            localField: 'projects.author',
            foreignField: '_id',
            as: 'authorDetails',
          },
        },
        {
          $unwind: '$authorDetails', // 배열 풀기
        },
        {
          $addFields: {
            'projects.isUserClipping': true,
            'projects.author': {
              imageUrl: '$authorDetails.imageUrl',
              name: '$authorDetails.name',
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            projects: { $push: '$projects' },
            totalClippingCount: { $first: '$totalClippingCount' },
          },
        },
        {
          $project: {
            _id: 0,
            projects: {
              $map: {
                input: '$projects',
                as: 'project',
                in: {
                  $mergeObjects: ['$$project'],
                },
              },
            },
            totalClippingCount: 1,
          },
        },
      ]
    : [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId!),
          },
        },
        {
          $project: {
            clippings: { $reverseArray: '$clippings' }, // favorites 배열을 역순으로 정렬
            totalClippingCount: 1,
          },
        },
        {
          $skip: (parseInt(page) - 1) * 20,
        },
        {
          $limit: parseInt(page) * 20,
        },
        {
          $unwind: '$clippings', // 배열 풀기
        },
        {
          $lookup: {
            from: 'projects',
            localField: 'clippings',
            foreignField: '_id',
            as: 'projects',
          },
        },
        {
          $unwind: '$projects', // 배열 풀기
        },
        {
          $lookup: {
            from: 'users',
            localField: 'projects.author',
            foreignField: '_id',
            as: 'authorDetails',
          },
        },
        {
          $unwind: '$authorDetails', // 배열 풀기
        },
        {
          $addFields: {
            'projects.isUserClipping': true,
            'projects.author': {
              imageUrl: '$authorDetails.imageUrl',
              name: '$authorDetails.name',
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            projects: { $push: '$projects' },
            totalClippingCount: { $first: '$totalClippingCount' },
          },
        },
        {
          $project: {
            _id: 0,
            projects: {
              $map: {
                input: '$projects',
                as: 'project',
                in: {
                  $mergeObjects: ['$$project'],
                },
              },
            },
            totalClippingCount: 1,
          },
        },
      ]
}
export async function GET(request: NextRequest, { params }: Params) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const searchParams = request.nextUrl.searchParams
  const skip = searchParams.get('skip') || '0'
  const limit = searchParams.get('limit') || '10'
  const page = searchParams.get('page') || '1'
  const userId = searchParams.get('userId') || ''
  const sessionId = searchParams.get('sessionId') || null
  // const createdAt = searchParams.get('lastCreatedAt')
  // const query = !createdAt
  //   ? {
  //       userId,
  //     }
  //   : {
  //       userId,
  //       createdAt: { $lt: createdAt },
  //     }
  try {
    const db = await dbConnect()
    const clippings = await UserInventory.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(token!.id),
        },
      },
      {
        $project: {
          clippings: { $reverseArray: '$clippings' }, // favorites 배열을 역순으로 정렬
          totalClippingCount: 1,
        },
      },
      {
        $skip: (parseInt(page) - 1) * 20,
      },
      {
        $limit: 20,
      },
      {
        $unwind: '$clippings', // 배열 풀기
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'clippings',
          foreignField: '_id',
          as: 'projects',
        },
      },
      {
        $unwind: '$projects', // 배열 풀기
      },
      {
        $lookup: {
          from: 'users',
          localField: 'projects.author',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      {
        $unwind: '$authorDetails', // 배열 풀기
      },
      {
        $addFields: {
          'projects.isUserClipping': true,
          'projects.author': {
            imageUrl: '$authorDetails.imageUrl',
            name: '$authorDetails.name',
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          projects: { $push: '$projects' },
          totalClippingCount: { $first: '$totalClippingCount' },
        },
      },
      {
        $project: {
          _id: 0,
          projects: {
            $map: {
              input: '$projects',
              as: 'project',
              in: {
                $mergeObjects: ['$$project'],
              },
            },
          },
          totalClippingCount: 1,
        },
      },
    ])
    // const clippings = await Clipping.find(query)
    //   .sort({ createdAt: -1 })
    //   // .skip(parseInt(skip))
    //   // .limit(parseInt(limit))
    //   .skip(0)
    //   .limit(20)
    //   .select('-userId')
    //   .populate({
    //     path: 'projectId',
    //     model: Project,
    //     select: '-blocks',
    //     populate: {
    //       path: 'author',
    //       model: User,
    //       select: 'name imageUrl',
    //     },
    //   })
    //   .exec()
    // let lastCreatedAt = null
    // if (clippings.length) {
    //   lastCreatedAt = clippings.at(-1)!.createdAt
    // }
    // const projects = clippings.map((clipping) => clipping.projectId)

    if (!clippings.length) {
      return NextResponse.json(
        {
          projects: [],
          projectLength: 0,
        },
        { status: 200 }
      )
    }
    const appearProjects = clippings[0].projects.filter((project: IProject) => !project.isHidden)
    const hiddenProjectCount = clippings[0].projects.length - appearProjects.length
    return NextResponse.json(
      {
        projects: appearProjects || [],
        projectLength: clippings[0].totalClippingCount - hiddenProjectCount || 0,
      },
      { status: 200 }
    )
    // return NextResponse.json(
    //   {
    //     projects: clippings[0]!.projects || [],
    //     projectLength: clippings[0]!.totalClippingCount || 0,
    //   },
    //   { status: 200 }
    // )
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json()
  // const userId = params.userId
  const { projectId, isAdd, userId } = body
  try {
    const db = await dbConnect()
    const userInventoryField = { clippings: projectId }
    const userQuery = isAdd
      ? { $addToSet: userInventoryField, $inc: { totalClippingCount: 1 } }
      : { $pull: userInventoryField, $inc: { totalClippingCount: -1 } }

    await UserInventory.findOneAndUpdate({ _id: userId }, userQuery, {
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
      .exec()
    // console.log(updatedUserInventory, updatedProject)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
