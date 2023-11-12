import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')

  if (!authHeader?.startsWith('Bearer'))
    return NextResponse.json({ message: 'not exist token' }, { status: 401 })
  const token = authHeader.split(' ')[1]
  console.log('auth header', token)
  let email, role, isError, name, id
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded: any) => {
    if (err) {
      isError = true
      return
    }
    email = decoded!.userInfo.email
    role = decoded!.userInfo.role
    name = decoded!.userInfo.name
    id = decoded!.userInfo.id
  })
  if (isError) return NextResponse.json({ message: 'forbidden' }, { status: 403 }) // 토큰 invalid
  return NextResponse.json({ email, role, id, name }, { status: 200 })
}
