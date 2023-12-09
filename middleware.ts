import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { authOptions } from './app/api/auth/[...nextauth]/route'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const absoluteURL = new URL('/signin', request.nextUrl.origin)
  // console.log(request.url)
  // console.log(request.nextUrl.pathname)

  // if (!token && request.nextUrl.pathname.toString().startsWith('/detail')) {
  //   console.log('token', token)
  //   // url.pathname = '/signin'
  //   return NextResponse.redirect(absoluteURL)
  // }
  // if (!token) return NextResponse.json({ error: 'need login' }, { status: 401 })
  // return NextResponse.next()
  // return NextResponse.next()
  // return NextResponse.rewrite(url)
  // return NextResponse.rewrite(request.url)
  const splitUrl = request.url.split(process.env.NEXT_PUBLIC_BASE_URL)[1]
  const doubleSplitUrl = splitUrl.split('/')
  if (
    !doubleSplitUrl.includes('api') &&
    doubleSplitUrl.at(-1) === 'clipping' &&
    doubleSplitUrl.at(-2) !== token?.id
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (!token?.accessToken) {
    const splitUrl = request.url.split(process.env.NEXT_PUBLIC_BASE_URL)[1]
    if (splitUrl.startsWith('/user')) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
    return NextResponse.json({ message: '권한이 없습니다 로그인 해주세요' }, { status: 401 })
  }
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/auth', {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  })
  if (!response.ok) {
    return NextResponse.json({ message: '권한이 없습니다 로그인 해주세요' }, { status: 401 })
  } else {
    const json = await response.json()
    if (json.email !== token.email)
      return NextResponse.json({ message: '권한이 없습니다' }, { status: 401 })
  }
  const nextResponse = NextResponse.next()
  nextResponse.headers.set('Authorization', token.id)
  return nextResponse
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/upload', '/profile'],
}
// '/user/:path*'
// '/api/user/:path*'
//'/:path*/clipping'
