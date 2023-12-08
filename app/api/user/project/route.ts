import dbConnect from '@/lib/dbConnect'
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
export async function GET(request: NextRequest, { params }: Params) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const searchParams = request.nextUrl.searchParams
  const skip = searchParams.get('skip') || '0'
  const limit = searchParams.get('limit') || '10'
  const page = searchParams.get('page') || '1'
  // const userId = params.userId
  const userId = searchParams.get('userId') || null
  const createdAt = searchParams.get('lastCreatedAt')
  // const userId = request.headers.get('Authorization') || searchParams.get('userId')
  const query = !createdAt
    ? {
        author: userId,
      }
    : {
        author: userId,
        createdAt: { $lt: createdAt },
      }
  // const userId = searchParams.
  console.log('project userId', userId)
  try {
    const db = await dbConnect()
    const projects = await UserInventory.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId!),
        },
      },
      {
        $project: {
          works: { $reverseArray: '$works' }, // favorites 배열을 역순으로 정렬
          totalProjectCount: 1,
        },
      },
      {
        $skip: (parseInt(page) - 1) * 20,
      },
      {
        $limit: parseInt(page) * 20,
      },
      {
        $unwind: '$works', // 배열 풀기
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'works',
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
        $lookup: {
          from: 'userinventories',
          let: { post_id: '$projects._id', user_id: new mongoose.Types.ObjectId(token!.id) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$_id', '$$user_id'] }, { $in: ['$$post_id', '$favorites'] }],
                },
              },
            },
          ],
          as: 'likedByUser',
        },
      },
      {
        $addFields: {
          'projects.isUserFavorite': {
            $cond: {
              if: {
                $gt: [{ $size: '$likedByUser' }, 0],
              },
              then: true,
              else: false,
            },
          },
          'projects.author': {
            imageUrl: '$authorDetails.imageUrl',
            name: '$authorDetails.name',
          },
        },
      },
      // {
      //   $sort: { 'projects.createdAt': -1 },
      // },
      {
        $group: {
          _id: '$_id',
          projects: { $push: '$projects' },
          totalProjectCount: { $first: '$totalProjectCount' },
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
                $mergeObjects: [
                  '$$project',
                  {
                    // Use the first element of the array
                    likedByUser: { $arrayElemAt: ['$$project.likedByUser', 0] },
                    // Add more fields as needed
                  },
                ],
              },
            },
          },
          totalProjectCount: 1,
        },
      },
    ])
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

    // let lastCreatedAt = null
    // if (projects.length) {
    //   lastCreatedAt = projects.at(-1)!.createdAt
    // }
    if (!projects.length) {
      return NextResponse.json(
        {
          projects: [],
          projectLength: 0,
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { projects: projects[0]!.projects || [], projectLength: projects[0]!.totalProjectCount || 0 },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
