import service from "@/appwrite/config";
import { getRandomProducts } from "@/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await service.getAllProducts();

    if (response) {
      const products = response.map((product) => ({
        ...product,
        imgurl:
          typeof product.imgurl === "string" ? JSON.parse(product.imgurl) : [],
      }));

      const selectedProducts = getRandomProducts(products, 4);
      
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

