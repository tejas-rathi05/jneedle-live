"use client"

import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link"
 
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from '@/hooks/use-media-query';
import { ProgressBarLink } from '../ui/progress-bar';


const getBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split("/").filter(segment => segment);
  return pathSegments.map((segment, index) => ({
    href: `/${pathSegments.slice(0, index + 1).join("/")}`,
    label: segment.replace(/-/g, " ").replace(/_/g, " "), // Convert hyphens/underscores to spaces
  }));
};


const ResponsiveBreadcrumbs = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname  = usePathname(); // Get current pathname
  const items = getBreadcrumbs(pathname); // Generate breadcrumbs
  const ITEMS_TO_DISPLAY = 2
  console.log("IS DESKTOP: ", isDesktop)

  console.log("items: ", items)

  return (
    <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href={items[0].href}>{items[0].label}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      {items.length > ITEMS_TO_DISPLAY ? (
        <>
          <BreadcrumbItem>
            {isDesktop ? (
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                  className="flex items-center gap-1"
                  aria-label="Toggle menu"
                >
                  <BreadcrumbEllipsis className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {items.slice(1, -2).map((item, index) => (
                    <DropdownMenuItem key={index}>
                      <ProgressBarLink href={item.href ? item.href : "#"}>
                        {item.label}
                      </ProgressBarLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger aria-label="Toggle Menu">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Navigate to</DrawerTitle>
                    <DrawerDescription>
                      Select a page to navigate to.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="grid gap-1 px-4">
                    {items.slice(1, -2).map((item, index) => (
                      <ProgressBarLink
                        key={index}
                        href={item.href ? item.href : "#"}
                        className="py-1 text-sm"
                      >
                        {item.label}
                      </ProgressBarLink>
                    ))}
                  </div>
                  <DrawerFooter className="pt-4">
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </>
      ) : null}
      {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
        <BreadcrumbItem key={index}>
          {item.href ? (
            <>
              <BreadcrumbLink
                asChild
                className="max-w-20 truncate md:max-w-none"
              >
                <ProgressBarLink href={item.href}>{item.label}</ProgressBarLink>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </>
          ) : (
            <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
              {item.label}
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>
      ))}
    </BreadcrumbList>
  </Breadcrumb>

  );
}

export default ResponsiveBreadcrumbs