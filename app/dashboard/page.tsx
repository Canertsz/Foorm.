"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

// TODO Add Form. text decoration to the background
// TODO Remove ts-ignores

function Dashboard() {
  const { data: session } = useSession()

  return (
    <div className="container text-xl flex flex-col gap-y-3 justify-center items-center max-w-5xl h-screen">
      <div>
        <div>
          Name: <span className="opacity-70">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="opacity-70">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-4 py-1 px-3 bg-zinc-900 opacity-80 hover:opacity-100 transition-all rounded"
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default Dashboard
