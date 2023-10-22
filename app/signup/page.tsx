"use client"

import * as React from "react"
import Link from "next/link"
import { FieldValues, useForm } from "react-hook-form"
import { useState } from "react"
import { Oval } from "react-loader-spinner"
import { useRouter } from "next/navigation"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export interface SignupProps {}

async function SignupForm(props: SignupProps) {
  const [error, setError] = useState<string[]>([])
  const [isRegistered, setIsregistered] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const router = useRouter()

  const session = await getServerSession(authOptions)

  if (session) redirect("/dashboard")

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
  } = useForm()

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsSubmitting(true)
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const { user } = await resUserExists.json()

      if (user) {
        setError([...error, "User already exist"])
        setIsSubmitting(false)
        return
      }

      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setIsSubmitting(false)
        setError([])
        setIsregistered(true)
        reset()
        router.push("/login")
      } else {
        setIsSubmitting(false)
        setIsregistered(false)
      }
    } catch (error) {
      setIsSubmitting(false)
      setIsregistered(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container flex flex-col gap-y-3 justify-center items-center max-w-5xl h-screen"
    >
      <span className="text-3xl font-bold mb-8">FOORM.</span>
      <input
        {...register("name", {
          required: "Name is required",
        })}
        type="text"
        className="w-72 px-3 py-[7px] rounded text-white bg-zinc-800 focus:outline-none placeholder:text-zinc-500"
        placeholder="name"
      />
      {errors.name && (
        <p className="bg-[#FF0000] antialiased font-medium w-72 text-center py-1 rounded">{`${errors.name.message}`}</p>
      )}
      <input
        {...register("email", {
          required: "Email is required",
        })}
        type="text"
        className="w-72 px-3 py-[7px] rounded text-white bg-zinc-800 focus:outline-none placeholder:text-zinc-500"
        placeholder="e-mail"
      />
      {errors.email && (
        <p className="bg-[#FF0000] antialiased font-medium w-72 text-center py-1 rounded">{`${errors.email.message}`}</p>
      )}
      <input
        {...register("password", {
          required: "Password is required",
          minLength: 8,
        })}
        type="password"
        className="w-72 px-3 py-[7px] rounded text-white bg-zinc-800 focus:outline-none placeholder:text-zinc-500"
        placeholder="password"
      />
      {errors.password && (
        <p className="bg-[#FF0000] antialiased font-medium w-72 text-center py-1 rounded">{`${errors.password.message}`}</p>
      )}
      <input
        {...register("confirmPassword", {
          required: "Confirm Password is required",
          validate: (value) =>
            value === getValues("password") || "Password must match",
        })}
        type="password"
        className="w-72 px-3 py-[7px] rounded text-white bg-zinc-800 focus:outline-none placeholder:text-zinc-500"
        placeholder="confirm password"
      />
      {errors.confirmPassword && (
        <p className="bg-[#FF0000] antialiased font-medium w-72 text-center py-1 rounded">{`${errors.confirmPassword.message}`}</p>
      )}
      <div className="flex gap-x-1 mt-2">
        <span className="text-zinc-500">Already have an account?</span>
        <Link href="/login" className="text-blue-500 cursor-pointer">
          Log in here
        </Link>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-[#0883cf] flex w-72 rounded py-2 mt-3 justify-center items-center disabled:bg-zinc-800"
      >
        {isSubmitting === true ? (
          <Oval
            height={24}
            width={24}
            color="#8b8b8b"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#838383"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : (
          "Sign up"
        )}
      </button>
      {error &&
        error.map((item) => (
          <div className="bg-[#FF0000] text-white w-72 text-center py-1 px-3 rounded-md mt-2">
            {item}
          </div>
        ))}
      {isRegistered ? (
        <div className="bg-[#4ef648] antialiased font-medium w-72 text-center text-black py-1 rounded">
          Successfully registered
        </div>
      ) : isRegistered === false ? (
        <div className="bg-[#FF0000] antialiased font-medium w-72 text-center py-1 rounded">
          Registration failed
        </div>
      ) : null}
    </form>
  )
}

export default SignupForm
