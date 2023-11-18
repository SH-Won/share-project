import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import User from '@/models/User'
import UserInventory from '@/models/UserInventory'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { projectId, userId, isAdd } = body
  try {
    const db = await dbConnect()
    const userInventoryField = { favorites: projectId }
    const userQuery = isAdd ? { $push: userInventoryField } : { $pull: userInventoryField }
    const projectField = { favoriteUsers: userId }
    const projectQuery = isAdd ? { $push: projectField } : { $pull: projectField }
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
