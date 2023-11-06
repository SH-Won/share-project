import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import Project from '@/models/Project'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams
  console.log(path)
  try {
    await dbConnect()
    const products = await Project.find({}).populate('writer').exec()
    return NextResponse.json({ products })
  } catch (e) {
    return NextResponse.json({ message: e, success: false })
  }
}
