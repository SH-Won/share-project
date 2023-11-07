import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import Project from '@/models/Project'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // const path = request.nextUrl.searchParams

  try {
    const db = await dbConnect()
    console.log('db connected')
    const products = await Project.find().populate('writer').exec()
    console.log('api call')
    return NextResponse.json({ products })
  } catch (e) {
    console.log('error')
    return NextResponse.json({ message: e, success: false })
  }
}
