import { IProject } from '@/app/page'
import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
export async function POST(req: Request) {
  try {
    const db = await dbConnect()
    const body = await req.json()
    const { image } = body
    const { imageUrl, imagePublicId } = (await new Promise((res, rej) => {
      cloudinary.uploader.upload(image, { folder: 'share-project' }, (err, result) => {
        if (err) rej(err)
        res({
          imagePublicId: result!.public_id as string,
          imageUrl: result!.secure_url as string,
        })
      })
    })) as { imageUrl: string; imagePublicId: string }
    const newProject = new Project({
      author: body.userId,
      title: body.title,
      description: body.description,
      imageUrl,
      imagePublicId,
    })
    const result = await newProject.save()
    const uploadProject = await Project.findOne({ _id: result._id })
      .populate({
        path: 'author',
        model: UserInventory,
        select: 'name imageUrl',
      })
      .exec()
    await db.disconnect()
    return NextResponse.json({ success: true, uploadProject }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
