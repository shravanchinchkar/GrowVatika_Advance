import client from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productData = await client.product.findMany({
      select: {
        id:true,
        name: true,
        description: true,
        productSize:true,
        price: true,
        compareAt: true,
        collection: true,
        tags:true,
        imageURL: true,
      },
    });
    if (!productData) {
      return NextResponse.json({
        success: false,
        error: "Error while fetching Products data",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Product data fetch successfully!",
      productData,
    });
  } catch (error) {
    console.error("Error while fetching product data:", error);
    return NextResponse.json({
      success: false,
      error: "Error while fetching Products data",
    });
  }
}
