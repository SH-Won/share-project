import dbConnect from '@/lib/dbConnect'
import { IProject } from '@/lib/network/types/project'
import Clipping from '@/models/Clipping'
import Favorite from '@/models/Favorite'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import mongoose from 'mongoose'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
// export const dynamic = 'force-dynamic'
interface Params {
  params: {
    id: string
  }
}
const getProcess = (id: string, userId: string) => {
  return userId
    ? [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id), // 조회할 게시글의 ObjectId
          },
        },
        {
          $lookup: {
            from: 'userinventories', // UserInventory 콜렉션
            let: { post_id: '$_id', user_id: new mongoose.Types.ObjectId(userId) }, // 변수 선언
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', '$$user_id'] }, // 클라이언트에서 전송된 유저의 ObjectId와 일치하는지 확인
                      { $in: ['$$post_id', '$favorites'] }, // 현재 게시글이 favorites 배열에 있는지 확인
                    ],
                  },
                },
              },
            ],
            as: 'likedByUser',
          },
        },
        {
          $lookup: {
            from: 'userinventories', // UserInventory 콜렉션
            let: { post_id: '$_id', user_id: new mongoose.Types.ObjectId(userId) }, // 변수 선언
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', '$$user_id'] }, // 클라이언트에서 전송된 유저의 ObjectId와 일치하는지 확인
                      { $in: ['$$post_id', '$clippings'] }, // 현재 게시글이 favorites 배열에 있는지 확인
                    ],
                  },
                },
              },
            ],
            as: 'clipByUser',
          },
        },
        {
          $lookup: {
            from: 'users', // User 콜렉션
            localField: 'author', // 게시글의 author 필드
            foreignField: '_id', // User의 _id 필드
            as: 'authorDetails',
          },
        },
        {
          $unwind: '$authorDetails', // 배열 필드 풀기
        },
        {
          $addFields: {
            isUserFavorite: {
              $cond: {
                if: {
                  $gt: [{ $size: '$likedByUser' }, 0], // likedByUser 배열이 비어있지 않으면 true, 아니면 false
                },
                then: true,
                else: false,
              },
            },
            isUserClipping: {
              $cond: {
                if: {
                  $gt: [{ $size: '$clipByUser' }, 0], // likedByUser 배열이 비어있지 않으면 true, 아니면 false
                },
                then: true,
                else: false,
              },
            },
            author: {
              _id: '$authorDetails._id',
              name: '$authorDetails.name',
              imageUrl: '$authorDetails.imageUrl',
            },
          },
        },
        {
          $project: {
            // 모든 게시글 필드를 포함하거나, 필요한 필드만 선택
            thumbnail: 1,
            title: 1,
            blocks: 1,
            isUserFavorite: 1,
            isUserClipping: 1,
            author: 1,
            isHidden: 1,
          },
        },
      ]
    : [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id), // 조회할 게시글의 ObjectId
          },
        },
        {
          $lookup: {
            from: 'users', // User 콜렉션
            localField: 'author', // 게시글의 author 필드
            foreignField: '_id', // User의 _id 필드
            as: 'authorDetails',
          },
        },
        {
          $unwind: '$authorDetails', // 배열 필드 풀기
        },
        {
          $addFields: {
            isUserFavorite: false,
            isUserClipping: false,
            author: {
              _id: '$authorDetails._id',
              name: '$authorDetails.name',
              imageUrl: '$authorDetails.imageUrl',
            },
          },
        },
        {
          $project: {
            // 모든 게시글 필드를 포함하거나, 필요한 필드만 선택
            thumbnail: 1,
            title: 1,
            blocks: 1,
            isUserFavorite: 1,
            isUserClipping: 1,
            author: 1,
          },
        },
      ]
}
export async function GET(request: NextRequest, { params }: Params) {
  const id = params.id
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const userId = token?.id
  try {
    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res(1)
    //   }, 1000)
    // })
    // return NextResponse.json({ message: 'failed fetch', status: 400 }, { status: 400 })
    const db = await dbConnect()
    const project = await Project.aggregate(getProcess(id, userId!))
    if (project[0].isHidden && project[0].author !== userId) {
      return NextResponse.json(
        { message: '해당 프로젝트는 현재 작성자만 볼 수 있습니다', status: 401 },
        { status: 401 }
      )
    }
    const result = await Project.find({ author: project[0].author._id, isHidden: { $ne: true } })
      .select('-blocks')
      .sort({ createdAt: -1 })
      .skip(0)
      .limit(7)
      .exec()
    const writerProjects = result.filter((project) => project._id.toString() !== id)
    return NextResponse.json({ project: project[0], writerProjects }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: e, status: 500 }, { status: 500 })
  }
}
