"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";

import service from "@/appwrite/config";
import AuthLayout from "@/components/AuthLayout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import UserAddress from "./components/UserAddress";
import { useAuthStore } from "@/lib/store/auth-store";

const Page = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUserId(user.$id);
    }
  }, [user]);

  const userAddressQuery = useQuery({
    queryKey: ["userAddress", currentUserId],
    queryFn: async () => {
      if (!currentUserId) return null;
      return await service.getUserAddress(currentUserId);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentUserId,
  });

  const deleteUserAddress = async (addressId: any) => {
    const res = await service.deleteUserAddress(addressId);
    if (res) {
      await userAddressQuery.refetch();
    }
  };

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
          {(!currentUserId || userAddressQuery.isLoading) && (
            <div className="flex flex-col gap-5">
              <Skeleton className="h-10 w-full" />
              <div className="flex">
                <Skeleton className="h-32 w-36" />
                <Skeleton className="h-32 w-36" />
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center sm:justify-start w-full h-full gap-10 mb-20">
            {currentUserId && userAddressQuery.data &&
              userAddressQuery.data.length > 0 &&
              userAddressQuery.data.map((address, index) => (
                <UserAddress 
                  key={address.id || index}
                  address={address} 
                  index={index} 
                  userId={currentUserId}
                />
              ))}

            {currentUserId && userAddressQuery.data && userAddressQuery.data.length === 0 && (
              <p className="py-10">Please add a new address</p>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </AuthLayout>
  );
};

export default Page;