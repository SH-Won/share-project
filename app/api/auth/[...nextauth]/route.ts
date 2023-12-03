import dbConnect from '@/lib/dbConnect'
import BackEnd from '@/lib/network'
import { IUserSignInBody } from '@/lib/network/types/user'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      id: 'email-password-credential',
      name: 'Credentials',

      credentials: {},
      async authorize(credentials) {
        try {
          const user = await BackEnd.getInstance().user.signin(credentials as IUserSignInBody)
          return user
        } catch (e) {
          throw new Error('user not exist')
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },

  session: {
    strategy: 'jwt',
    maxAge: 14 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.accessTokenExpiry = user.accessTokenExpiry
        token.role = user.role
        // token.favorites = user.favorites
        token.imageUrl = user.imageUrl || '/noImage.svg'
        // token.favoriteId = user.favoriteId
        return token
      }
      if (trigger === 'update') {
        token.imageUrl = session.imageUrl
        return token
      }
      console.log('jwt func called')
      const refreshTime = Math.round((token.accessTokenExpiry as number) - Date.now())
      if (refreshTime > 0) {
        return token
      }
      await dbConnect()
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({
          refreshToken: token.refreshToken,
        }),
      })
      if (!response.ok) {
        token.error = 'invalid'
        return token
      }
      const json = await response.json()
      console.log('new refresh token exec')
      token.accessToken = json.accessToken
      token.refreshToken = json.refreshToken
      token.accessTokenExpiry = json.accessTokenExpiry
      token.role = json.role
      token.email = json.email
      token.name = json.name
      token.id = json.id
      token.imageUrl = json.imageUrl
      return token
    },
    async session({ session, token }) {
      session.email = token.email
      session.id = token.id
      session.name = token.name
      session.role = token.role
      session.favoriteId = token.favoriteId
      session.error = token.error
      session.imageUrl = token.imageUrl
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
