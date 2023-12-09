import mongoose from 'mongoose'

const Query = {
  USER_PROJECT_PROCESS: (sessionId: string, userId: string, page: number) => {
    return sessionId
      ? [
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
            $unwind: '$works', // 배열 풀기
          },
          {
            $skip: (page - 1) * 20,
          },
          {
            $limit: 20,
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
              let: { post_id: '$projects._id', user_id: new mongoose.Types.ObjectId(sessionId!) },
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
            $lookup: {
              from: 'userinventories', // UserInventory 콜렉션
              let: { post_id: '$_id', user_id: new mongoose.Types.ObjectId(sessionId!) }, // 변수 선언
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
              'projects.isUserClipping': {
                $cond: {
                  if: {
                    $gt: [{ $size: '$clipByUser' }, 0], // likedByUser 배열이 비어있지 않으면 true, 아니면 false
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
        ]
      : [
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
            $unwind: '$works', // 배열 풀기
          },
          {
            $skip: (page - 1) * 20,
          },
          {
            $limit: 20,
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
            $addFields: {
              'projects.isUserFavorite': false,
              'project.isUserClipping': false,
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
                    $mergeObjects: ['$$project'],
                  },
                },
              },
              totalProjectCount: 1,
            },
          },
        ]
  },
  USER_FAVORITE_PROJECT: (sessionId: string, userId: string, page: number) => {
    return sessionId
      ? [
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
            $unwind: '$favorites', // 배열 풀기
          },
          {
            $skip: (page - 1) * 20,
          },
          {
            $limit: 20,
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
              let: {
                post_id: '$projects._id',
                user_id: new mongoose.Types.ObjectId(sessionId),
              },

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
        ]
      : [
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
            $unwind: '$favorites', // 배열 풀기
          },
          {
            $skip: (page - 1) * 20,
          },
          {
            $limit: 20,
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
            $addFields: {
              'projects.isUserFavorite': false,
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
                    $mergeObjects: ['$$project'],
                  },
                },
              },
              totalFavoriteCount: 1,
            },
          },
        ]
  },
  USER_CLIPPING_PROJECT: (userId: string, page: number) => {
    return [
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
        $skip: (page - 1) * 20,
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
  },
}

export default Query
