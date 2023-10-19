"use client"

import * as React from "react"
import Link from "next/link"
import { FieldValues, useForm } from "react-hook-form"

//  TODO create api, implement NextAuth.js and save users to the MongoDB
//  TODO create a middleware, set login page as default

export interface SignupProps {}

function SignupForm(props: SignupProps): JSX.Element {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
  } = useForm()

  // TODO Inform useron UI when error occurs
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        console.log("User registration successful")
        reset()
      } else {
        console.log("User registration failed")
      }
    } catch (error) {
      console.log("error while fething data: ", error)
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
        <p className="bg-[#FF0000] antialiased font-bold w-72 text-center py-1 rounded">{`${errors.name.message}`}</p>
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
        <p className="bg-[#FF0000] antialiased font-bold w-72 text-center py-1 rounded">{`${errors.email.message}`}</p>
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
        <p className="bg-[#FF0000] antialiased font-bold w-72 text-center py-1 rounded">{`${errors.password.message}`}</p>
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
        <p className="bg-[#FF0000] antialiased font-bold w-72 text-center py-1 rounded">{`${errors.confirmPassword.message}`}</p>
      )}
      <div className="flex gap-x-1 mt-2">
        <span className="text-zinc-500">Already have an account?</span>
        <Link href="/login" className="text-blue-500 cursor-pointer">
          Log in here
        </Link>
      </div>
      <button type="submit" className="bg-[#0883cf] w-72 rounded py-1 mt-3">
        sign up
      </button>
    </form>
  )
}

export default SignupForm
