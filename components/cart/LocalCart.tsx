"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/helpers";
import { useAuthStore } from "@/lib/store/auth-store";
import { useCartStore } from "@/lib/store/cart-store";

const LocalCart = () => {
  const router = useRouter();
  const { authStatus } = useAuthStore();
  const { items, updateQuantity, removeFromCart } = useCartStore();

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleIncreaseQuantity = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
  };
  const handleCheckout = () => {
    if (!authStatus) {
      router.push("/login");
    }
    if (authStatus) {
      router.push("/checkout");
    }
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // console.log(cartItems.length);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center max-w-4xl">
        {items.length > 0 ? (
          <div className="w-full h-full">
            <h1 className="py-10 text-3xl text-gray-600">YOUR SHOPPING BAG</h1>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="">Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-10"> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-b">
                {items.map((item) => (
                  <TableRow key={item.id} className="border-none">
                    <TableCell className="font-medium">
                      <Link href={`/products/${item.id}`}>
                        <div>
                          <img
                            src={item.imgurl[0].previewUrl}
                            alt={item.name}
                            className="w-[100px] h-[100px] object-contain"
                          />
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center w-32 border">
                        <Button
                          variant={"ghost"}
                          className="w-fit h-12"
                          onClick={() =>
                            handleDecreaseQuantity(item.id, item.quantity)
                          }
                        >
                          <Minus size={10} />
                        </Button>
                        <div className="w-full h-12 flex justify-center items-center text-center">
                          <input
                            type="string"
                            value={item.quantity}
                            readOnly
                            className="w-full h-full bg-transparent text-center text-sm border-none"
                          />
                        </div>
                        <Button
                          variant={"ghost"}
                          className="w-fit h-12"
                          onClick={() =>
                            handleIncreaseQuantity(item.id, item.quantity)
                          }
                        >
                          <Plus size={10} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatPrice(item?.price * item.quantity)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={"ghost"}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <FaTrashAlt className="text-red-800" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
                <Button variant={'custom'}
                className="px-8 py-4 rounded-none"
                  onClick={handleCheckout}
                >
                  <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                    CHECKOUT
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20">
            <div className="flex flex-col items-center justify-center">
              <ShoppingBag size={40} className="text-muted-foreground" />
              <p className="text-muted-foreground mt-3">YOUR CART IS EMPTY!</p>
            </div>
            <Link href="/products">
              <div className="w-fit py-10">
                <Button variant={'custom'} className="rounded-none">
                  <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                    SHOP OUR PRODUCTS
                  </span>
                </Button>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default LocalCart;
