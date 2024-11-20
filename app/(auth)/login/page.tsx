"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";

import authService from "@/appwrite/auth";
import AuthLayout from "@/components/AuthLayout";
import LoginForm from "@/components/LoginForm";
import { useAuthStore } from "@/lib/store/auth-store";
import { Button } from "@/components/ui/button";


const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const {authStatus, setUser, logout} = useAuthStore()

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log("userdata: ", userData)
          setUser(userData);
        } else {
          logout();
          router.push("/login");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthLayout authentication={true}>
      {authStatus ? (
        <div className="mx-auto max-w-xl min-h-screen flex flex-col py-16 relative items-center justify-center px-4 ">
          <div className="flex flex-col justify-center items-center gap-3">
            <FaCircleCheck size={32} className="text-gray-500" />
            <p className="text-gray-700 tracking-wider">
              Logged in successfully!
            </p>
          </div>

          <div className="w-fit my-20">
            <Link href={`/products?category=all`}>
              <Button variant={'custom'}>
                <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                  SHOP ALL PRODUCTS
                </span>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </AuthLayout>
  );
};

export default page;
