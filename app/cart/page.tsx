"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import LocalCart from "@/components/cart/LocalCart";
import UserCart from "@/components/cart/user-cart/UserCart";
import { useAuthStore } from "@/lib/store/auth-store";

const CartPage = () => {
  const { authStatus } = useAuthStore()

  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-start pb-32 min-h-screen">
      {authStatus ? <UserCart /> : <LocalCart />}
    </MaxWidthWrapper>
  );
};

export default CartPage;
