"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";

import service from "@/appwrite/config";
import AuthLayout from "@/components/AuthLayout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AiFillEdit } from "react-icons/ai";
import React from "react";
import UpdateAddressForm from "@/components/UpdateAddressForm";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import UserAddress from "./components/UserAddress";

const page = () => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.auth.userData);
  const currentUserId = currentUser.userData.$id;

  const userAddressQuery = useQuery({
    queryKey: ["userAddress", currentUserId],
    queryFn: async () => {
      return await service.getUserAddress(currentUserId);
    },
    staleTime: 1000 * 60 * 5,
  });



  

  const deleteUserAddress = async (addressId: string) => {
    const res = await service.deleteUserAddress(addressId);
    if (res) {
      await userAddressQuery.refetch();
    }
  };

  console.log(userAddressQuery.data);

  return (
    <AuthLayout authentication={true}>
      <MaxWidthWrapper className="min-h-screen">
        <div className="flex items-center justify-start py-10 gap-3 border-b-2 mb-10">
          <button
            type="button"
            className="hover:bg-gray-100 rounded-xl p-3"
            onClick={() => router.replace("/my-account")}
          >
            <ArrowLeft />
          </button>
          <div className="flex flex-col items-start justify-center">
            <p className="text-xs text-black/50">BACK TO MY ACCOUNT</p>
            <p className="text-3xl tracking-wider">MY ADDRESS</p>
          </div>
        </div>

        <div>
          {userAddressQuery.isLoading && (
            <div className="flex flex-col gap-5">
              <Skeleton className="h-10 w-[100%]" />
              <div className="flex">
                <Skeleton className="h-32 w-36" />
                <Skeleton className="h-32 w-36" />
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center sm:justify-start w-full h-full gap-10 mb-20">
            {userAddressQuery.data &&
              userAddressQuery.data.length > 0 &&
              userAddressQuery.data.map((address, index) => (
                <UserAddress address= {address} index={index} userId={currentUserId}/>
              ))}

            {!userAddressQuery.data && !userAddressQuery.isLoading && (
              <p className="py-10">Please add a new address</p>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </AuthLayout>
  );
};

export default page;
