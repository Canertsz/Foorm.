import { signIn } from "next-auth/react"
import NextAuth, { SessionStrategy } from "next-auth"
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

      async authorize(
        credentials: Record<string, string> | undefined,
        req: any,
      ) {
        const { email, password } = credentials || {}

        try {
          await connectMongoDB()
          const user = await User.findOne({ email })

          if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid credentials")
          }

          return user
        } catch (error) {
          console.error(error)
          throw error // Rethrow the error for higher-level error handling if needed
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export { authOptions }
