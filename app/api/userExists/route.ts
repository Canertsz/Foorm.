import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { ResponseBody } from "@/types"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body: ResponseBody = await req.json()

    const { email } = body

    await connectMongoDB()

    const user = await User.findOne({ email }).select("_id")

    console.log("user: ", user)

    return NextResponse.json({ user })
  } catch (error) {
    console.log(error)
  }
}
