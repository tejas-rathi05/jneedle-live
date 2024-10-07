"use client";

import { motion } from "framer-motion";
import conf from "@/conf/conf";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/store";
import Link from "next/link";

import { ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import FacebookIcon from "@/components/icons/FacebookIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import LogoutBtn from "@/components/LogoutBtn";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.1 * index,
    },
  }),
};

export function SideNav() {
  const authStatus = useAppSelector((state) => state.auth.status);

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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="w-full h-full p-5 opacity-1 ">
          <Link href={"/"}>
            <p className="w-full p-2 border-b-[2px] side_tabs capitalize">
              Home
            </p>
          </Link>
          {navQuery.data &&
            navQuery.data.map((item: any, index: number) => {
              return (
                <>
                  <motion.div
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{
                      once: true,
                    }}
                    custom={index}
                    key={index}
                  >
                    <a href={`/collections${item.href}`}>
                      {typeof item.navLink === "string" && (
                        <p className="w-full p-2 border-b-[2px] side_tabs capitalize">
                          {item.navLink}
                        </p>
                      )}

                      {Array.isArray(item.navLink) &&
                        item.navLink[0]?.previewUrl && (
                          <button className="w-full py-2 border-b-[2px] side_tabs">
                            <img
                              src={item.navLink[0].previewUrl}
                              alt=""
                              width={80}
                              className="object-contain"
                            />
                          </button>
                        )}
                    </a>
                  </motion.div>
                </>
              );
            })}

          <a href={"/"}>
            <p className="w-full p-2 border-b-[2px] side_tabs capitalize">
              About Us
            </p>
          </a>

          {authStatus ? (
            <a href={`/my-account`}>
              <div className="w-full p-2 mt-5 font-bold  side-tabs flex justify-between items-center cursor-pointer hover:bg-gray-100/50 rounded-xl">
                Account <ChevronRight />
              </div>
            </a>
          ) : (
            <div className="flex justify-center items-center w-full my-10">
              <a
                href={`/login`}
                className="w-full"
              >
                <button className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                    Login
                  </span>
                </button>
              </a>
            </div>
          )}
        </div>

        <SheetFooter className="w-full absolute bottom-0 left-0">
          <div className="w-full h-full">
            {authStatus && (
              <div className="mb-5 px-5">
                <LogoutBtn />
              </div>
            )}
            <div className="w-full border-t-[2px] p-2 flex gap-2">
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
