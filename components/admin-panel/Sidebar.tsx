"use client";

import {
  Badge,
  ChevronLeft,
  Home,
  Package,
  Package2,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { ProgressBarLink } from "../ui/progress-bar";

const Sidebar = ({
  pathname,
}: {
  pathname: string;
}) => {
  const [currentPath, setCurrentPath] = useState("dashboard");

  useEffect(() => {
    if (pathname.startsWith("/admin/dashboard")) {
      setCurrentPath("dashboard");
    } else if (pathname.startsWith("/admin/orders")) {
      setCurrentPath("orders");
    } else if (pathname.startsWith("/admin/products")) {
      setCurrentPath("products");
    }
  }, [pathname]);
  return (
    <div
      className={`hidden border-r bg-muted/40 md:block transition-[width] ease-in-out duration-300 w-72`}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
      <div
          className={`flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 relative justify-between`}
        >
          <ProgressBarLink href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <p>JNeedle</p>
          </ProgressBarLink>
          
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <ProgressBarLink
              href="/admin/dashboard"
              className={`flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:text-primary justify-start ${
                currentPath === "dashboard"
                  ? "bg-muted"
                  : "text-muted-background"
              }`}
            >
              <Home
                className={` transition-all ease-in-out duration-200 h-4 w-4`}
              />
              <p>Dashboard</p>
            </ProgressBarLink>
            <ProgressBarLink
              href="/admin/orders"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary justify-start ${
                currentPath === "orders" ? "bg-muted" : "text-muted-background"
              }`}
            >
              <ShoppingCart
                className={` transition-all ease-in-out duration-200 h-4 w-4`}
              />
              <p>Orders</p>
              {/* {isSidebarOpen && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              )} */}
            </ProgressBarLink>
            <ProgressBarLink
              href="/admin/products"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary justify-start ${
                currentPath === "products"
                  ? "bg-muted"
                  : "text-muted-background"
              }`}
            >
              <Package
                className={` transition-all ease-in-out duration-200 h-4 w-4`}
              />
              <p>Products</p>
            </ProgressBarLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
