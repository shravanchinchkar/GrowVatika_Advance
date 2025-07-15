import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const limit: number = 6;
    const skip = (currentPage - 1) * Number(limit); // offset formula

    if (currentPage < 1) {
      return NextResponse.json({
        success: false,
        error: "Invalid page number",
      });
    }

    const productsData = await client.product.findMany({
      where: {
        productStatus: "Active",
      },
      select: {
        id: true,
        name: true,
        description: true,
        productSize: true,
        price: true,
        compareAt: true,
        collection: true,
        tags: true,
        imageURL: true,
      },
      skip: skip, // Skip records based on current page
      take: limit, // Limit the number of records returned
      orderBy: {
        id: "asc", // Optional: Add consistent ordering
      },
    });

    if (!productsData) {
      return NextResponse.json({
        success: false,
        error: "Error while fetching Products data",
      });
    }

    const totalProductsCount = await client.product.count({
      where: {
        productStatus: "Active",
      },
    });
    if (!totalProductsCount) {
      console.error(
        "product data found but error while getting count of total products"
      );
      return NextResponse.json({
        success: false,
        error:
          "product data found but error while getting count of total products",
      });
    }

    const totalPages = Math.ceil(totalProductsCount / Number(limit));

    return NextResponse.json({
      success: true,
      message: "Product data fetch successfully!",
      productsData,
      totalProductsCount,
      totalPages,
    });
  } catch (error) {
    console.error("Error while fetching product data:", error);
    return NextResponse.json({
      success: false,
      error: "Error while fetching Products data",
    });
  }
}
