import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await dbConnect()
    const result = await req.json()
    const cookies = result.cookies
    const { email, password } = result as { email: string; password: string }
    const user = await User.findOne({ email }).exec()
    if (!user) return NextResponse.json({ message: 'invalid' }, { status: 401 })
    const isMatchPassword = await bcrypt.compare(password, user.password)
    if (isMatchPassword) {
      const role = user.role
      const accessToken = jwt.sign(
        {
          userInfo: {
            email: user.email,
            role: role,
            _id: user._id,
            name: user.name,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '10s',
        }
      )
      const newRefreshToken = jwt.sign(
        {
          email: user.email,
          role: role,
          _id: user._id,
          name: user.name,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '600s',
        }
      )
      if (cookies?.refreshtoken) {
        const refreshToken = cookies.refreshtoken

        NextResponse.next().cookies.delete('refreshtoken')
      }
      user.refreshToken = newRefreshToken
      const result = await user.save()
      const response = NextResponse.json(
        {
          accessToken,
          accessTokenExpiry: Date.now() + 10 * 1000,
          refreshToken: newRefreshToken,
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        { status: 200 }
      )
      // response.cookies.set({
      //   name: 'refreshtoken',
      //   value: newRefreshToken,
      //   httpOnly: true,
      //   secure: true,
      //   // sameSite: 'None',
      //   maxAge: 24 * 60 * 60 * 1000,
      // })
      return response
    } else {
      return NextResponse.json({ message: 'invalid' }, { status: 401 })
    }
  } catch (e) {
    return NextResponse.json({ message: e, success: false })
  }
}
