import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer'))
    return NextResponse.json({ message: 'not exist token' }, { status: 401 })
  const token = authHeader.split(' ')[1]
  let email, role, isError
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      isError = true
      return
    }
    email = decoded!.userInfo.email
    role = decoded!.userInfo.role
  })
  if (isError) return NextResponse.json({ message: 'forbidden' }, { status: 403 }) // 토큰 invalid
  return NextResponse.json({ email, role, success: true }, { status: 200 })
}