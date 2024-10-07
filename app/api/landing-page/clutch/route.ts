import service from "@/appwrite/config";
import conf from "@/conf/conf";
import { getRandomProducts } from "@/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`${conf.baseURL}/api/fetch-all-products`, {
      method: "POST",
      body: JSON.stringify({ category: "clutch" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response) {
      const data= await response.json();
      const selectedProducts = getRandomProducts(data, 4);

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
