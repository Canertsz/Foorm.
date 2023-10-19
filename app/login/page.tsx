"use client"

import * as React from "react"
import Link from "next/link"
import { useForm, FieldValues } from "react-hook-form"

export interface LoginProps {}

function LoginForm(props: LoginProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data: FieldValues) => {
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container flex flex-col gap-y-3 justify-center items-center max-w-5xl h-screen"
    >
      <span className="text-3xl font-bold mb-8">FOORM.</span>
      <input
        {...register("email")}
        type="text"
        className="w-72 px-3 py-[7px] rounded text-white bg-zinc-800 focus:outline-none placeholder:text-zinc-500"
        placeholder="e-mail"
      />
      {errors.email && (
        <p className="bg-[#FF0000] antialiased font-bold w-72 text-center py-1 rounded">{`${errors.email.message}`}</p>
      )}
      <input
        {...register("password")}
        type="password"
        className="w-72 px-3 py-[7px] rounded text-white bg-zinc-800 focus:outline-none placeholder:text-zinc-500"
        placeholder="password"
      />
      {errors.password && (
        <p className="bg-[#FF0000] antialiased font-bold w-72 text-center py-1 rounded">{`${errors.password.message}`}</p>
      )}
      <div className="flex gap-x-1 mt-2">
        <span className="text-zinc-500">Don't have an account</span>
        <Link href="/signup" className="text-blue-500 cursor-pointer">
          Sign up here
        </Link>
      </div>
      <button type="submit" className="bg-[#0883cf] w-72 rounded py-1 mt-3">
        Log in
      </button>
    </form>
  )
}

export default LoginForm
