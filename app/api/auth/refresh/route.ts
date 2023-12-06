import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
interface MyJWTPayload {
  email: string
  role: number
}
export async function POST(req: Request) {
  const db = await dbConnect()
  // const cookie = req.headers.get('cookie')
  // const refreshToken = cookie?.split('=')[1]
  const { refreshToken } = await req.json()
  if (!refreshToken)
    return NextResponse.json({ message: 'not exist refreshToken' }, { status: 401 })
  // const refreshToken = cookies.refreshtoken
  // res.clearCookie('refreshtoken', { httpOnly: true, sameSite: 'None', secure: true })
  // NextResponse.next().cookies.delete('refreshtoken')
  const foundedUser = await User.findOne({ refreshToken }).exec()
  let isError, nextRefreshToken, hackedUser, nextAccessToken
  if (!foundedUser) {
    console.log('not founded User')
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,

      async (err: any, decode: any) => {
        if (err) {
          isError = true
        }
        hackedUser = await User.findOne({ email: decode?.email }).exec()

        // hackedUser.refreshToken = ''
        // const result = await hackedUser.save()
      }
    )
    return NextResponse.json({ message: 'invalid' }, { status: 403 })
  }
  const { accessToken, newRefreshToken, name, email, role, id, imageUrl } = (await new Promise(
    (res, rej) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err: any, decode: any) => {
        if (err) {
          foundedUser.refreshToken = ''
          const result = await foundedUser.save()
        }
        if (err || foundedUser.email !== decode!.email) {
          isError = true

          rej({
            accessToken: '',
            newRefreshToken: '',
          })
          isError = true
          return
        }
        const role = foundedUser.role
        const accessToken = jwt.sign(
          {
            userInfo: {
              email: foundedUser.email,
              role: role,
              id: foundedUser._id,
              name: foundedUser.name,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1h',
          }
        ) as string
        const newRefreshToken = jwt.sign(
          {
            email: foundedUser.email,
            role: role,
            id: foundedUser._id,
            name: foundedUser.name,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '14d' }
        ) as string

        foundedUser.refreshToken = newRefreshToken
        const result = await foundedUser.save()
        res({
          accessToken,
          newRefreshToken,
          email: foundedUser.email,
          id: foundedUser._id,
          name: foundedUser.name,
          role: role,
          imageUrl: foundedUser.imageUrl,
        })
      })
    }
  )) as {
    accessToken: string
    newRefreshToken: string
    email: string
    id: string
    name: string
    role: number
    imageUrl: string
  }
  if (isError) return NextResponse.json({ message: 'invalid' }, { status: 403 })
  const response = NextResponse.json(
    {
      accessToken,
      accessTokenExpiry: Date.now() + 50 * 60 * 1000,
      refreshToken: newRefreshToken,
      name,
      email,
      role,
      id,
      imageUrl,
    },
    {
      status: 200,
    }
  )
  console.log('response refreshToken')
  // response?.cookies.set({
  //   name: 'refreshtoken',
  //   value: newRefreshToken,
  //   httpOnly: true,
  //   secure: true,
  //   maxAge: 24 * 60 * 60,
  // })
  // await db?.disconnect()
  return response
}
