"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import service from "@/appwrite/config";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiFillEdit } from "react-icons/ai";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import UpdateAddressForm from "@/components/UpdateAddressForm";
import { Spinner } from "@/components/ui/spinner";
import { FaTrashAlt } from "react-icons/fa";

const UserAddress = ({
  address,
  index,
  userId,
}: {
  address: any;
  index: number;
  userId: string;
}) => {
  const queryClient = useQueryClient();

  const setPrimaryAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      try {
        const res = await service.setPrimaryAddress(userId, addressId);
        if (res) {
          await queryClient.invalidateQueries({
            queryKey: ["userAddress", userId],
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error deleting address");
      }
    },
    onSuccess: () => {
      toast.success("Address deleted successfully!");
    },
    onError: () => {
      toast.error("Error deleting address");
    },
  });

  const deleteUserAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      try {
        const res = await service.deleteUserAddress(addressId);
        if (res) {
          await queryClient.invalidateQueries({
            queryKey: ["userAddress", userId],
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error deleting address");
      }
    },
    onSuccess: () => {
      toast.success("Address deleted successfully!");
    },
    onError: () => {
      toast.error("Error deleting address");
    },
  });
  return (
    <div
      key={index}
      className={`${
        address.isDefault
          ? "bg-stone-800 rounded-lg p-3 "
          : "flex flex-col items-start"
      }`}
    >
      {address.isDefault ? (
        <p className="text-white pb-2 text-sm text-center ">PRIMARY ADDRESS</p>
      ) : (
        <Button
          variant={"ghost"}
          className="text-xs"
          onClick={() => setPrimaryAddressMutation.mutate(address.$id)}
        >
          SET AS PRIMARY ADDRESS
          {setPrimaryAddressMutation.isPending && <Spinner size={'small'} className="ml-2"/>}
        </Button>
      )}
      <div
        key={index}
        className="p-5 h-56 w-60 rounded-md shadow-lg bg-gray-50 border border-stone-800"
      >
        <div className="w-full h-full flex flex-col items-end justify-between">
          <div className="w-full h-full text-left">
            <p className="text-lg font-semibold">
              {address.firstName} {address.lastName}
            </p>
            <div className="truncate">
              <p className="text-sm">{address.phone}</p>
              <p className="text-sm">{address.address1}</p>
              <p className="text-sm">{address.address2}</p>
              <p className="text-sm">
                {address.city}, {address.state} - {address.pincode}
              </p>
            </div>
            <p className="text-sm">{address.country}</p>
          </div>
          <div className="w-full h-full flex items-center justify-end gap-3">
            <Dialog>
              <DialogTrigger className="p-3">
                <AiFillEdit size={18} />
              </DialogTrigger>
              <DialogContent className="px-0">
                <AlertDialogHeader>
                  <DialogTitle className="text-2xl tracking-wider my-5 text-center">
                    UPDATE ADDRESS
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Please update your:
                  </DialogDescription>
                </AlertDialogHeader>
                <UpdateAddressForm formData={address} currentUserId={userId} />
              </DialogContent>
            </Dialog>
            <button
              type="button"
              className="hover:bg-gray-100 rounded-xl p-3"
              onClick={() => deleteUserAddressMutation.mutate(address.$id)}
            >
              {deleteUserAddressMutation.isPending ? (
                <Spinner className="text-red-800" />
              ) : (
                <FaTrashAlt size={18} className="text-red-800" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
