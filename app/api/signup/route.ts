import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import UserInfo from '@/models/UserInfo'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, userName, email, password } = await req.json()
  if (!name || !userName || !email || !password)
    return NextResponse.json({ message: '성함, 이메일, 비밀번호 모두 필요합니다' }, { status: 400 })
  const db = await dbConnect()
  const existUser = await User.findOne({ email }).exec()
  if (existUser)
    return NextResponse.json({ message: '동일한 이메일로 가입된 내역이 있습니다' }, { status: 400 })
  try {
    const hashPassword = await bcrypt.hash(password, 10)
    console.log('create user info')
    const userInfo = await UserInfo.create({
      favorites: {
        '6551220d106b047def4d5167': {
          project: '6551220d106b047def4d5167',
        },
        '6550bf7793a2b22078187a5f': {
          project: '6550bf7793a2b22078187a5f',
        },
      },
    })
    console.log(userInfo)
    const result = await User.create({
      name,
      userName,
      email,
      password: hashPassword,
      favorites: {},
      favoriteId: userInfo._id,
    })
    db?.disconnect()
    return NextResponse.json({ success: true, message: '회원 가입 성공' }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { success: false, message: '서버에 문제가 생겼습니다. 다시 시도해주세요' },
      { status: 500 }
    )
  }
}
