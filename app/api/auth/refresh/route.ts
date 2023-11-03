import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
export async function GET(req: Request) {
  await dbConnect()
  const cookie = req.headers.get('cookie')
  const refreshToken = cookie?.split('=')[1]
  if (!refreshToken)
    return NextResponse.json({ message: 'not exist refreshToken' }, { status: 401 })
  // const refreshToken = cookies.refreshtoken
  // res.clearCookie('refreshtoken', { httpOnly: true, sameSite: 'None', secure: true })
  // NextResponse.next().cookies.delete('refreshtoken')
  const foundedUser = await User.findOne({ refreshToken }).exec()
  let isError, nextRefreshToken, hackedUser, nextAccessToken
  if (!foundedUser) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
      if (err) {
        isError = true
      }
      hackedUser = await User.findOne({ email: decode?.email }).exec()

      // hackedUser.refreshToken = ''
      // const result = await hackedUser.save()
    })
    return NextResponse.json({ message: 'invalid' }, { status: 403 })
  }
  const { accessToken, newRefreshToken } = await new Promise((res, rej) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
      if (err) {
        foundedUser.refreshToken = ''
        const result = await foundedUser.save()
      }
      if (err || foundedUser.email !== decode?.email) {
        isError = true
        rej()
        return
      }
      const role = foundedUser.role
      const accessToken = jwt.sign(
        {
          userInfo: {
            email: foundedUser.email,
            role: role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '10s',
        }
      )
      const newRefreshToken = jwt.sign(
        { email: foundedUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '600s' }
      )

      foundedUser.refreshToken = newRefreshToken
      const result = await foundedUser.save()
      res({
        accessToken,
        newRefreshToken,
      })
    })
  })
  if (isError) return NextResponse.json({ message: 'invalid' }, { status: 403 })
  const response = NextResponse.json(
    {
      accessToken,
    },
    {
      status: 200,
    }
  )
  response?.cookies.set({
    name: 'refreshtoken',
    value: newRefreshToken,
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60,
  })
  return response
}
