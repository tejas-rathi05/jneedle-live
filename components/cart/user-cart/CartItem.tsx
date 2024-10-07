"use client";

import service from "@/appwrite/config";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/helpers";
import { UserCartItem } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

const CartItem = ({
  item,
  imgUrl,
  userData,
  index,
}: {
  item: any;
  imgUrl: any;
  userData: any;
  index: number;
}) => {
  const queryClient = useQueryClient();

  const handleIncreaseMutation = useMutation({
    mutationFn: async () => {
      try {
        await service.updateCartItem(item.$id, item.quantity + 1);
        await queryClient.invalidateQueries({
          queryKey: ["cartItems", userData?.userData?.$id ?? userData?.$id],
          refetchType: "all",
        });
      } catch (error) {
        console.log(error);
        toast.error("Error adding product");
      }
    },
    onError: () => {
      toast.error("Error adding product");
    },
  });

  const handleDecreaseMutation = useMutation({
    mutationFn: async () => {
      try {
        if (item.quantity > 1) {
          await service.updateCartItem(item.$id, item.quantity - 1);
          await queryClient.invalidateQueries({
            queryKey: ["cartItems", userData?.userData?.$id ?? userData?.$id],
            refetchType: "all",
          });
        } else {
          handleRemoveMutation.mutate(item.$id);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error adding product");
      }
    },
    onError: () => {
      toast.error("Error deleting product");
    },
  });

  const handleRemoveMutation = useMutation({
    mutationFn: async () => {
      try {
        await service.deleteCartItem(item.$id);
        await queryClient.invalidateQueries({
          queryKey: ["cartItems", userData?.userData?.$id ?? userData?.$id],
          refetchType: "all",
        });
      } catch (error) {
        console.log(error);
        toast.error("Error adding product");
      }
    },
    onError: () => {
      toast.error("Error adding product");
    },
  });

  return (
    <TableRow key={item.$id} className="border-none">
      <TableCell className="font-medium">
        <div>
          {item.product ? (
            <Link href={`/products/${item.product.$id}`}>
              <img
                src={imgUrl[0]["previewUrl"]}
                alt={item.product.name}
                className="w-[100px] h-[100px] object-contain"
              />
            </Link>
          ) : (
            <p>No image available</p>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex justify-center items-center w-32 border">
          <Button
            variant={"ghost"}
            className="w-fit h-12"
            onClick={() =>
              item.$id &&
              item.quantity != null &&
              handleDecreaseMutation.mutate()
            }
          >
            {handleDecreaseMutation.isPending ? (
              <Spinner className="size-[10px]" />
            ) : (
              <Minus size={10} />
            )}
          </Button>
          <div className="w-full h-12 flex justify-center items-center text-right">
            <input
              type="number"
              value={item.quantity}
              readOnly
              className="w-full h-full bg-transparent text-center text-sm border-none"
            />
          </div>
          <Button
            variant={"ghost"}
            className="w-fit h-12"
            onClick={() =>
              item.$id &&
              item.quantity != null &&
              handleIncreaseMutation.mutate()
            }
          >
            {handleIncreaseMutation.isPending ? (
              <Spinner className="size-[10px]" />
            ) : (
              <Plus size={10} />
            )}
          </Button>
        </div>
      </TableCell>
      <TableCell>
        {item.product ? formatPrice(item.product.price * item.quantity) : "N/A"}
      </TableCell>
      <TableCell>
        <Button
          variant={"ghost"}
          onClick={() =>
            item.$id && item.quantity != null && handleRemoveMutation.mutate()
          }
        >
          {handleRemoveMutation.isPending ? (
            <Spinner className="size-[10px] text-red-800" />
          ) : (
            <FaTrashAlt className="text-red-800" />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
