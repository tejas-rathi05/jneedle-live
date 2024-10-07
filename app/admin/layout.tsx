"use client";

import Link from "next/link";
import {
  CircleChevronRight,
  Ellipsis,
  EllipsisVertical,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  PanelsTopLeft,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin-panel/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ResponsiveBreadcrumbs from "@/components/admin-panel/ResponsiveBreadcrumbs";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  const filteredPath = pathArray.filter((path) => path !== "");

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar pathname={pathname} />
      <div className="flex flex-col w-full">
        <header className="flex h-14 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 gap-3 sm:gap-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelsTopLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">JNeedle</span>
                </Link>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </a>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="hidden sm:block">
            <Breadcrumb>
              <BreadcrumbList className="truncate">
                {filteredPath.map((path, index) => {
                  return (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink href={pathname}>
                          <p>{path}</p>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < filteredPath.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="sm:hidden">
            <ResponsiveBreadcrumbs />
          </div>
        </header>

        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
