import { signIn } from "next-auth/react"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import bcrypt from "bcryptjs"

// TODO Homepage -> Dashboard, if user not logged in, he/she will be redirected
// TODO to the login page

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      // @ts-ignore
      async authorize(credentials) {
        // @ts-ignore
        const { email, password } = credentials
        try {
          await connectMongoDB()
          const user = await User.findOne({ email })

          if (!user) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            return null
          }

          return user
        } catch (error) {
          console.log(error)
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}

// @ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export default authOptions
