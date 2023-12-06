import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string
    name: string
    email: string
    role: number
    accessToken: string
    refreshToken: string
    accessTokenExpiry: number
    imageUrl: string
    message: string
  }
  interface Session {
    id: string
    name: string
    email: string
    role: number
    accessToken: string
    refreshToken: string
    accessTokenExpiry: number
    favorites: object
    favoriteId: string
    imageUrl: string
    error: 'invalid' | undefined
    user: {
      /** The user's postal address. */
      name: string
      email: string
      role: number
      accessToken: string
      refreshToken: string
      accessTokenExpiry: number
      favorites: object
      favoriteId: string
    } & DefaultSession['user']
  }
}
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string
    name: string
    email: string
    sub: string
    accessToken: string
    refreshToken: string
    accessTokenExpiry: number
    imageUrl: string
    favorites: object
    favoriteId: string
    role: number
    error: 'invalid' | undefined
  }
}
