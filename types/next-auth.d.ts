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
  }
  interface Session {
    id: string
    name: string
    email: string
    role: number
    accessToken: string
    refreshToken: string
    accessTokenExpiry: number
    user: {
      /** The user's postal address. */
      name: string
      email: string
      role: number
      accessToken: string
      refreshToken: string
      accessTokenExpiry: number
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
    role: number
  }
}
