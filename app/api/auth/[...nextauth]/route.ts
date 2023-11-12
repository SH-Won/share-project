import dbConnect from '@/lib/dbConnect'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  secret: '12345',
  providers: [
    CredentialProvider({
      id: 'email-password-credential',
      name: 'Credentials',

      credentials: {},
      async authorize(credentials) {
        const response = await fetch('http://localhost:3000/api/signin', {
          method: 'POST',
          body: JSON.stringify(credentials),
        })
        if (!response.ok) {
          throw new Error('user not exist')
        }
        const user = await response.json()
        // console.log(user)
        return user
      },
    }),
  ],
  // pages: {
  //   signIn: '/login',

  // },

  session: {
    strategy: 'jwt',
    maxAge: 14 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.accessTokenExpiry = user.accessTokenExpiry
        token.role = user.role
        token.favorites = user.favorites
        return token
      }
      console.log('jwt func called')
      const refreshTime = Math.round((token.accessTokenExpiry as number) - Date.now())
      console.log('refreshTime', refreshTime)
      if (refreshTime > 0) {
        // console.log('not need refresh ')
        return token
      }
      await dbConnect()
      const response = await fetch('http://localhost:3000/api/auth/refresh', {
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
      console.log('accessToken', json.accessToken)
      token.accessToken = json.accessToken
      token.refreshToken = json.refreshToken
      token.accessTokenExpiry = json.accessTokenExpiry
      token.role = json.role
      token.email = json.email
      token.name = json.name
      token.id = json.id
      return token
    },
    async session({ session, token }) {
      // session.accessToken = token.accessToken
      // session.accessTokenExpiry = token.accessTokenExpiry

      session.email = token.email
      session.id = token.id
      session.name = token.name
      session.role = token.role
      session.favorites = token.favorites
      // session.error = token.error
      // console.log('session', token)
      // console.log('session', session)
      // session.refreshToken = token.refreshToken
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
