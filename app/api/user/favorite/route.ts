import dbConnect from '@/lib/dbConnect'
import Favorite from '@/models/Favorite'
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
  // const userId = params.userId
  const skip = searchParams.get('skip') || '0'
  const limit = searchParams.get('limit') || '10'
  const page = searchParams.get('page') || '1'
  const userId = searchParams.get('userId') || null
  const createdAt = searchParams.get('lastCreatedAt')
  // const userId = request.headers.get('Authorization')
  const query = !createdAt
    ? {
        userId,
      }
    : {
        userId,
        createdAt: { $lt: createdAt },
      }
  try {
    const db = await dbConnect()
    const favorites = await UserInventory.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId!),
        },
      },
      {
        $project: {
          favorites: { $reverseArray: '$favorites' }, // favorites 배열을 역순으로 정렬
          totalFavoriteCount: 1,
        },
      },
      {
        $skip: (parseInt(page) - 1) * 20,
      },
      {
        $limit: parseInt(page) * 20,
      },
      {
        $unwind: '$favorites', // 배열 풀기
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'favorites',
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
          totalFavoriteCount: { $first: '$totalFavoriteCount' },
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
          totalFavoriteCount: 1,
        },
      },
    ])

    // const favorites = await Favorite.find(query)
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
    // if (favorites.length) {
    //   lastCreatedAt = favorites.at(-1)!.createdAt
    // }

    // const projects = favorites.map((favorite) => favorite.projectId).filter((el) => !!el)
    // const projects = favorites[0].projects.filter((favorite) => !!favorite)
    if (!favorites.length) {
      return NextResponse.json(
        {
          projects: [],
          projectLength: 0,
        },
        { status: 200 }
      )
    }
    return NextResponse.json(
      {
        projects: favorites[0].projects,
        projectLength: favorites[0].totalFavoriteCount,
      },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
export async function PUT(req: NextRequest, { params }: Params) {
  // const userId = params.userId
  const body = await req.json()
  const { projectId, isAdd } = body
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const userId = token?.id

  try {
    const db = await dbConnect()
    const userInventoryField = { favorites: projectId }
    const userQuery = isAdd
      ? { $addToSet: userInventoryField, $inc: { totalFavoriteCount: 1 } }
      : { $pull: userInventoryField, $inc: { totalFavoriteCount: -1 } }
    const projectQuery = isAdd ? { $inc: { favoriteCount: 1 } } : { $inc: { favoriteCount: -1 } }
    const [updatedUserInventory, updatedProject] = await Promise.all(
      [
        () =>
          UserInventory.findOneAndUpdate({ _id: userId }, userQuery, {
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
            .exec(),
        () =>
          Project.findOneAndUpdate({ _id: projectId }, projectQuery, {
            new: true,
          })
            // .populate({
            //   path: 'writer',
            //   model: User,
            // })
            .exec(),
      ].map((func) => func())
    )
    if (!updatedUserInventory || !updatedProject) {
      return NextResponse.json({ error: 'failed' }, { status: 400 })
    }
    // console.log(updatedUserInventory, updatedProject)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 400 })
  }
}
