import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  try {
    const db = await dbConnect()
    // const c = await UserInventory.aggregate([
    //   {
    //     $match: { _id: new mongoose.Types.ObjectId(userId as string) },
    //   },
    //   {
    //     $project: {
    //       favorites: 1,
    //       favoriteTotalCount: { $size: '$favorites' },
    //       clippingTotalCount: { $size: '$clippings' },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'projects',
    //       let: { favorites: '$favorites' },
    //       localField: 'favorites',
    //       foreignField: '_id',

    //       pipeline: [
    //         { $skip: 0 },
    //         { $limit: 2 },
    //         {
    //           $match: {
    //             $expr: { $in: ['$_id', '$$favorites'] },
    //           },
    //         },
    //         {
    //           $lookup: {
    //             from: 'users',
    //             localField: 'writer',
    //             foreignField: '_id',
    //             as: 'writer',
    //             pipeline: [
    //               {
    //                 $project: {
    //                   name: 1,
    //                 },
    //               },
    //               { $unwind: '$writer.name' },
    //               // { $set: { writer: { $first: '$writer.name' } } },
    //             ],
    //           },
    //         },
    //       ],
    //       as: 'favorites',
    //     },
    //   },
    //   // {
    //   //   $replaceRoot: {
    //   //     newRoot: {
    //   //       $mergeObjects: [
    //   //         {
    //   //           _id: '',
    //   //           favorites: '$favorites',
    //   //           favoriteTotalCount: '',
    //   //           clippingTotalCount: '',
    //   //         },
    //   //         '$$ROOT',
    //   //       ],
    //   //       //'$favoriteTotalCount', '$clippingTotalCount'
    //   //     },
    //   //   },
    //   // },
    // ])
    // console.log(c[0])
    const userInventory = await UserInventory.findOne(
      { _id: userId }
      // {
      //   favorites: { $slice: [0, 5] },
      //   clippings: { $slice: [0, 5] },
      // }
    )
      .populate([
        {
          path: 'favorites',
          populate: {
            path: 'author',
            model: UserInventory,
            select: 'name imageUrl',
          },
          model: Project,
          perDocumentLimit: 5,
        },
        {
          path: 'clippings',
          populate: {
            path: 'author',
            model: UserInventory,
            select: 'name imageUrl',
          },
          model: Project,
          perDocumentLimit: 5,
        },
      ])
      .exec()
    // console.log('count is')
    // console.log(userInventory.favorites.length, userInventory.clippings.length)

    // db.disconnect()
    return NextResponse.json({ userInventory: userInventory }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: 'error' }, { status: 500 })
  }
}
