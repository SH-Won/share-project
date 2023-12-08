import { TEditBlock } from '@/context/UploadContext'
import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
interface IUploadedImage {
  index: number
  imageUrl: string
  imagePublicId: string
}
interface IProjectBlock extends Omit<TEditBlock, 'name'> {
  index: number
  imageUrl?: string
  imagePublicId?: string
}
export async function POST(req: NextRequest) {
  try {
    const db = await dbConnect()
    const body = (await req.json()) as {
      userId: string
      thumbnail: { value: string; index?: number }
      blocks: IProjectBlock[]
      title: string
    }
    const { title, userId, thumbnail, blocks } = body
    const images = blocks
      .map((block, index) => {
        if (block.type === 'image') {
          return {
            ...block,
            index: index,
          }
        }
        return block
      })
      .filter((el) => el.type === 'image')
    // const { image } = body
    // const { imageUrl, imagePublicId } = (await new Promise((res, rej) => {
    //   cloudinary.uploader.upload(image, { folder: 'share-project' }, (err, result) => {
    //     if (err) rej(err)
    //     res({
    //       imagePublicId: result!.public_id as string,
    //       imageUrl: result!.secure_url as string,
    //     })
    //   })
    // })) as { imageUrl: string; imagePublicId: string }
    const uploadedImages = (await Promise.all(
      [thumbnail].concat(images).map(async (image) => {
        return new Promise((res, rej) => {
          cloudinary.uploader.upload(image.value, { folder: 'share-project' }, (err, result) => {
            if (err) rej(err)
            res({
              imageUrl: result!.secure_url as string,
              imagePublicId: result!.public_id as string,
              index: image!.index || 0,
            })
          })
        })
      })
    )) as IUploadedImage[]

    for (let i = 1; i < uploadedImages.length; i++) {
      const { index, imageUrl, imagePublicId } = uploadedImages[i]
      blocks[index].value = imageUrl
      blocks[index].imagePublicId = imagePublicId
    }

    // const newProject = new Project({
    //   author: body.userId,
    //   title: body.title,
    //   description: body.description,
    //   imageUrl,
    //   imagePublicId,
    // })
    const newProject = new Project({
      author: userId,
      title: body.title,
      thumbnail: uploadedImages[0],
      blocks,
    })
    const result = await newProject.save()
    const uploadProject = await Project.findOne({ _id: result._id })
      .select('-blocks')
      .populate({
        path: 'author',
        model: User,
        select: 'name imageUrl',
      })
      .exec()
    const inventoryQuery = { $addToSet: { works: result._id }, $inc: { totalProjectCount: 1 } }
    await UserInventory.findOneAndUpdate({ _id: userId }, inventoryQuery, { new: true })
    await db.disconnect()
    return NextResponse.json({ success: true, uploadProject }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
