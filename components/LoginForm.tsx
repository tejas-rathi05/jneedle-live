"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { FaGoogle } from "react-icons/fa";
import authService from "@/appwrite/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/store/auth-store";
import { Button } from "./ui/button";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string>("");

  const login = async (data: any) => {
    setError("");
    try {
      await authService.login(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const session = await authService.googleLogin();
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
          router.push("/products");
        }
      }
    } catch (error: any) {
      setError(error.message);
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

            <Button
              variant={"custom"}
              className="h-12 rounded-none"
              type={"submit"}
            >
              <p className="relative">Sign in</p>
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?
            <Link
              className="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
              href="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
        <div className="mt-6 border-t pt-6">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={"custom"}
              className="h-12 rounded-none"
              onClick={handleGoogleLogin}
            >
              <div className="relative flex justify-center items-center">
                <FaGoogle className="mr-2 h-4 w-4" />
                <p>Sign in with Google</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
