"use client";

import React from "react";
import conf from "@/conf/conf";
import Link from "next/link";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { Button } from "./ui/button";

const BestSellers = () => {
  const featuredProductsQuery = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await fetch(`${conf.baseURL}/api/landing-page/featured`);
      const data = await res.json();
      return data;
    },
    staleTime: 100 * 60 * 60 * 60,
  });

  return (
    <MaxWidthWrapper>
      <section className="py-20 lg:pb-20">
        <div className="flex justify-between items-center cursor-pointer">
          <h2 className="text-5xl w-full font-extrabold text-center text-stone-800 tracking-wider">
            FEATURED PRODUCTS
          </h2>
        </div>

        <div className="flex justify-center mt-10">
          <div className="w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredProductsQuery.isLoading && (
              <>
                <Skeleton className="w-[100%] h-80" />
                <Skeleton className="w-[100%] h-80" />
                <Skeleton className="w-[100%] h-80" />
                <Skeleton className="w-[100%] h-80" />
              </>
            )}
            {featuredProductsQuery.isSuccess &&
              featuredProductsQuery.data.map((product: Product[], index: number) => (
                <ProductCard product={product} key={index} />
              ))}
          </div>
        </div>
        <div className="flex justify-center items-center w-full my-10">
          <Link href={`/products?category=all`}>
            <Button variant={'custom'}>
              <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                SHOP ALL PRODUCTS
              </span>
            </Button>
          </Link>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default BestSellers;
