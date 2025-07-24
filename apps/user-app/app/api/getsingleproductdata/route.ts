import client from "@repo/db/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    const productData = await client.product.findUnique({
      where: {
        id: productId || "",
      },
      include: {
        seller: {
          select: {
            nurseryName: true,
            address: true,
            profilePictureURL: true,
          },
        },
      },
    });

    if (!productData) {
      return NextResponse.json({
        success: false,
        error: "product not found",
      });
    } else {
      const {
        id,
        sellerId,
        productStatus,
        visibility,
        ...filteredProductData
      } = productData;
      return NextResponse.json({
        success: true,
        message: "product data found!",
        productData: filteredProductData,
      });
    }
  } catch (error) {
    console.error("Error while fetching single product data:", error);
  }
}
