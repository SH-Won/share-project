import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    await dbConnect()
    const products = await Product.find({}).exec()
    return NextResponse.json({ products })
  } catch (e) {
    return NextResponse.json({ message: e, success: false })
  }
}
