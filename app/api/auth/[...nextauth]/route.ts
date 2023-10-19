import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      // @ts-ignore
      async authorize(credentials) {
        const user = { id: 1 }
        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}

// @ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
