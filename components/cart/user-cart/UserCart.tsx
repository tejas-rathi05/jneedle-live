"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { formatPrice } from "@/helpers";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import service from "@/appwrite/config";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCartItem } from "@/types";
import CartItem from "./CartItem";
import { useAuthStore } from "@/lib/store/auth-store";

const UserCart = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { authStatus, user } = useAuthStore()

  const cartQuery = useQuery({
    queryKey: ["cartItems", user.$id],
    queryFn: async () => {
      const userId = user.$id;
      console.log("userId: ", userId);
      const cartData = await service.getCartItems(userId);
      console.log("cartData: ", cartData);
      if (cartData) {
        const transformedCartData = transformCartData(cartData);
        return transformedCartData;
      } else {
        return null;
      }
    },
  });

  const transformCartData = (cartData: any[]): UserCartItem[] => {
    return cartData.map((item) => {
      // Assuming your Document structure matches UserCartItem
      return {
        userId: item.userId,
        $id: item.$id,
        product: item.product,
        productId: item.productId,
        quantity: item.quantity,
      };
    });
  };

  const handleCheckout = () => {
    if (!authStatus) {
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  const calculateTotal = () => {
    if (cartQuery.data) {
      return cartQuery.data.reduce((total, item) => {
        if (item.product && item.product.price != null) {
          return total + item.product.price * item.quantity;
        } else {
          return total;
        }
      }, 0);
    } else {
      return 0;
    }
  };

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full max-w-4xl">
        {cartQuery.isLoading && (
          <div className="flex flex-col gap-5 mt-32">
            <Skeleton className="lg:w-80 h-10" />
            <Skeleton className="lg:w-80 h-10" />
            <Skeleton className="lg:w-80 h-10" />
          </div>
        )}
        {cartQuery.data && cartQuery.data.length > 0 && (
          <div className="w-full h-full">
            <h1 className="py-10 text-3xl text-gray-600">YOUR SHOPPING BAG</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-10"> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-b">
                {cartQuery.data.map((item, index) => {
                  const imgUrl = item.product
                    ? JSON.parse(item.product.imgurl)
                    : [];
                  console.log("imgUrl: ", imgUrl);

                  return (
                    <CartItem
                      item={item}
                      imgUrl={imgUrl}
                      userData={user}
                      index={index}
                    />
                  );
                })}
              </TableBody>
            </Table>
            <div className="w-full max-w-4xl mt-10 text-right flex flex-col items-end justify-center">
              <p className="text-sm font-light">TOTAL :</p>
              <p className="text-xl tracking-widest">
                {formatPrice(calculateTotal())}
              </p>
              <p className="my-5 text-gray-600">
                Shipping & taxes calculated at checkout
              </p>
              <div className="w-fit">
                <Button
                  variant={'custom'}
                  className="rounded-none"
                  onClick={handleCheckout}
                >
                  <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                    CHECKOUT
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}{" "}
        {cartQuery.data && cartQuery.data.length <= 0 && (
          <div className="py-20">
            <div className="flex flex-col items-center justify-center">
              <ShoppingBag size={40} className="text-muted-foreground" />
              <p className="text-muted-foreground mt-3">YOUR CART IS EMPTY!</p>
            </div>
            <div className="flex w-full justify-center items-center">
              <Link href="/products">
                <div className="py-10">
                  <Button variant={'custom'} className="rounded-none">
                    <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                      SHOP OUR PRODUCTS
                    </span>
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserCart;
