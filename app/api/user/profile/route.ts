import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import UserInventory from '@/models/UserInventory'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { userId, image } = body
  try {
    await dbConnect()
    const userInventory = await User.findOne({ _id: userId }).exec()
    const { imageUrl, imagePublicId } = (await new Promise((res, rej) => {
      if (userInventory.imagePublicId) cloudinary.uploader.destroy(userInventory.imagePublicId)
      cloudinary.uploader.upload(image, { folder: 'user-image' }, (err, result) => {
        if (err) rej(err)
        res({
          imagePublicId: result!.public_id as string,
          imageUrl: result!.secure_url as string,
        })
      })
    })) as { imageUrl: string; imagePublicId: string }
    // const result = new Promise((resolve, reject) => {
    //   cloudinary.uploader.destroy(id, (result) => {
    //     resolve(result)
    //   })
    // })
    userInventory.imageUrl = imageUrl
    userInventory.imagePublicId = imagePublicId
    const result = await userInventory.save()
    // const userInventory = await userInventory.findOneAndUpdate(
    //   { _id: userId },
    //   {
    //     $set: {
    //       userImage: imageUrl,
    //       imagePublicId,
    //     },
    //   },
    //   { new: true }
    // )
    return NextResponse.json({ imageUrl: result.imageUrl }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: 'failed' }, { status: 400 })
  }
}
