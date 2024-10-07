"use client";

import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useAppSelector } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import service from "@/appwrite/config";
import { Skeleton } from "@/components/ui/skeleton";
import PrimaryAddress from "@/components/PrimaryAddress";
import MyOrders from "@/components/MyOrders";

const Page = () => {
  const currentUser = useAppSelector((state) => state.auth.userData);

  const userAddressQuery = useQuery({
    queryKey: ["userAddress", currentUser?.$id],
    queryFn: async () => {
      if (!currentUser) return null;
      return await service.getUserAddress(currentUser.$id);
    },
    enabled: !!currentUser,
  });

  console.log("User Address: ", userAddressQuery.data);

  return (
      <MaxWidthWrapper className="min-h-screen">
        {currentUser ? (
          <div>
            <div className="pb-20">
              <p className="text-2xl tracking-wider my-10">MY ACCOUNT</p>
              <p>
                Welcome back, {currentUser?.userData?.name || currentUser?.name}
                !
              </p>
            </div>

            <div className="w-full h-full flex flex-col md:flex-row gap-10">
              <MyOrders />
              <div className="w-full md:w-2/5 h-full text-sm">
                {userAddressQuery.isLoading && (
                  <div className="flex flex-col gap-5">
                    <>
                      <Skeleton className="h-10 w-[100%]" />
                    </>
                    <div className="flex">
                      <Skeleton className="h-32 w-36" />
                      <Skeleton className="h-32 w-36" />
                    </div>
                  </div>
                )}
                {userAddressQuery.data && (
                  <PrimaryAddress
                    userAddressData={userAddressQuery.data}
                    currentUserId={currentUser.$id}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-2xl tracking-wider my-10">MY ACCOUNT</p>
            <p>You are not logged in.</p>
          </div>
        )}
      </MaxWidthWrapper>
  );
};

export default Page;
