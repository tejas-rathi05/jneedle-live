"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import service from "@/appwrite/config";
import conf from "@/conf/conf";

import {
  Search,
  ShoppingBag,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import UserProfileBtn from "@/components/UserProfileBtn";
import { useAppSelector } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { SideNav } from "@/components/SideNav";
import { UserCartItem } from "@/types";

const Navbar = () => {
  const authStatus = useAppSelector((state) => state.auth.status);
  const [toShowSearch, setToShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<UserCartItem[] | []>([]);
  const userData = useAppSelector((state) => state.auth.userData);
  const localCartItems = useAppSelector((state) => state.cart.items);

  const toggleSearch = () => {
    setToShowSearch(!toShowSearch);
  };

  const transformCartData = (cartData: any[]): UserCartItem[] => {
    return cartData.map((item) => {
      return {
        userId: item.userId,
        $id: item.$id,
        product: item.product,
        productId: item.productId,
        quantity: item.quantity,
      };
    });
  };

  const navQuery = useQuery({
    queryKey: ["Pages"],
    queryFn: async () => {
      const res = await fetch(`${conf.baseURL}/api/pages/fetch-all-pages`, {
        method: "GET",
      });
      const data = res.json();
      return data;
    },
  });

  console.log("Pages: ", navQuery.data);

  const cartQuery = useQuery({
    queryKey: ["cartItems", userData?.userData?.$id ?? userData?.$id],
    queryFn: async () => {
      const userId = userData?.userData?.$id ?? userData?.$id;
      const cartData = await service.getCartItems(userId);
      if (cartData) {
        const transformedCartData = transformCartData(cartData);
        return transformedCartData;
      } else {
        return [];
      }
    },
    enabled: !!authStatus, // Ensure query only runs if authStatus is true
  });

  useEffect(() => {
    if (authStatus) {
      if (cartQuery.data) {
        setCartItems(cartQuery.data);
      }
    } else {
      setCartItems(localCartItems as UserCartItem[]);
    }
  }, [authStatus, cartQuery.data, localCartItems]);

  return (
    <nav>
      
      <div className="relative w-full z-30 h-[80px] lg:h-[100px] flex justify-between items-center border-b bg-white">
        <div className="flex justify-center lg:justify-between items-center mx-auto w-full max-w-screen-2xl px-5 md:px-10 lg:px-20">
          <div className="lg:hidden flex absolute left-5">
            <SideNav />
          </div>

          <Link href="/">
            <div className="size-[60px] lg:size-[80px] cursor-pointer">
              <img
                src="/images/logo/logo.png"
                alt="JNEEDLE"
                className="w-full h-full object-contain"
                width={80}
                height={80}
              />
            </div>
          </Link>

          <div className="flex gap-x-2 xl:gap-x-5 max-lg:hidden">
            {navQuery.isSuccess &&
              navQuery.data &&
              navQuery.data.map((item: any, index: number) => {
                console.log(item);
                return (
                  <a
                    href={`/collections${item.href}`}
                  >
                    <div className="relative p-2 cursor-pointer hover:font-bold transition-all ease-in-out duration-150">
                      {typeof item.navLink === "string" && (
                        <Button variant="linkHover2" className="text-xs uppercase">
                          {item.navLink}
                        </Button>
                      )}

                      {Array.isArray(item.navLink) &&
                        item.navLink[0]?.previewUrl && (
                          <button>
                            <img
                              src={item.navLink[0].previewUrl}
                              alt=""
                              width={80}
                              className="object-contain"
                            />
                          </button>
                        )}
                    </div>
                  </a>
                );
              })}
            
            <Link href="">
              <div className="relative p-2 cursor-pointer hover:font-bold transition-all ease-in-out duration-150">
                <Button variant="linkHover2" className="text-xs">
                  SALE
                </Button>
              </div>
            </Link>

            <Link href="/#about-us">
              <div className="relative p-2 cursor-pointer hover:font-bold transition-all ease-in-out duration-150">
                <Button variant="linkHover2" className="text-xs">
                  ABOUT US
                </Button>
              </div>
            </Link>
          </div>

          <div className="flex gap-x-1 lg:gap-x-2 items-center justify-center absolute right-5 top-0 lg:relative h-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100/50"
                    onClick={toggleSearch}
                  >
                    <Search className="size-[20px] lg:size-[24px]" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Link href="/cart">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-100/50 relative">
                      <ShoppingBag className="size-[20px] lg:size-[24px]" />
                      {cartItems.length > 0 && (
                        <div>
                          <span className="absolute bottom-0 right-2 bg-black text-white text-[10px] w-[15px] h-[15px] rounded-full text-center">
                            {cartItems.length}
                          </span>
                        </div>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>

            {authStatus ? (
              <div className="hidden sm:block">
                <UserProfileBtn />
              </div>
            ) : (
              <Link href="/login">
                <Button variant="gooeyLeft" className="ml-3 max-sm:hidden">
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <SearchInput isOpen={toShowSearch} onClose={toggleSearch} />
    </nav>
  );
};

export default Navbar;
