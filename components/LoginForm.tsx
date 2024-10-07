"use client";

import React, { startTransition, useState } from "react";
import { login as authLogin } from "@/lib/features/authSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import authService from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { ProgressBarLink, useProgressBar } from "./ui/progress-bar";

export default function LoginForm() {
  const router = useRouter();
  const {start, done} = useProgressBar();
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string>("");

  const login = async (data: any) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
          router.replace("/");

      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      start()
      const session = await authService.googleLogin();
      console.log("Session: ", session);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("User Data: ", userData);
        if (userData) {
          dispatch(authLogin(userData));
          router.push("/products");
        }
      }
    } catch (error: any) {
      setError(error.message);
    }finally{
      done()
    }
  };
  return (
    <div className="flex py-16 relative items-center justify-center px-4 ">
      {/* <div className="absolute top-0 z-[-1] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(91,79,73,0.13)_0,rgba(91,79,73,0)_50%,rgba(91,79,73,0)_100%)]"></div> */}
      <div className="mx-auto z-10 text-gray-700 w-full max-w-[500px]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-normal font-geist tracking-tighter">
            Welcome back
          </h1>
          <p className="text-gray-800/90 dark:text-gray-400 font-geist font-normal">
            Sign in to your account to continue
          </p>
        </div>
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="Enter your email"
                required
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Invalid email",
                  },
                })}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>

              <Input
                placeholder="Enter your password"
                required
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>

            <button
              type="submit"
              className="relative flex justify-center items-center  h-12 w-full mx-auto text-center font-geist tracking-tighter overflow-hidden rounded bg-stone-800 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?
            <ProgressBarLink
              className="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
              href="/signup"
            >
              Sign up
            </ProgressBarLink>
          </p>
        </div>
        <div className="mt-6 border-t pt-6">
          <div className="flex items-center justify-center gap-4">
            <button
              className="relative flex justify-center items-center  h-12 w-full mx-auto text-center font-geist tracking-tighter  overflow-hidden rounded bg-stone-800 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
              onClick={handleGoogleLogin}
            >
              <FaGoogle className="text-white mr-2 h-4 w-4" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}