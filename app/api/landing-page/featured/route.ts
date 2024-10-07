import { NextRequest, NextResponse } from "next/server";

import service from "@/appwrite/config";
import { Product } from "@/types";


export async function GET(req: NextRequest) {
  try {
    const response = await service.getAllProducts();

    if (response) {
      const products:Product[]= response.map((product:any) => ({
        ...product,
        imgurl:
          typeof product.imgurl === "string" ? JSON.parse(product.imgurl) : [],
      }));

      const selectedProducts = products.filter(product => product.featured === true);
      
      return NextResponse.json(selectedProducts);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

