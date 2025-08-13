import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const currentPage = searchParams.get("page")? Number(searchParams.get("page")): 1;
    const categoryParams = searchParams.get("category")?.trim();
    const limit: number = 6;
    const skip = (currentPage - 1) * Number(limit); // offset formula

    if (currentPage < 1) {
      return NextResponse.json({
        success: false,
        error: "Invalid page number",
      });
    }

    // excute the following block if there is no category filter or category===All
    if (categoryParams === "All") {
      const productsData = await client.product.findMany({
        where: {
          productStatus: "Active",
        },
        select: {
          category:true,
          collection: true,
          id: true,
          name: true,
          productSize: true,
          price: true,
          compareAt: true,
          tags: true,
          imageURL: true,
          productQuantity:true
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
    }
    // Execute the following block only if there is a category filter present
    else {
      const productsData = await client.product.findMany({
        where: {
          productStatus: "Active",
          category: categoryParams,
        },
        select: {
          category:true,
          collection: true,
          id: true,
          name: true,
          productSize: true,
          price: true,
          compareAt: true,
          tags: true,
          imageURL: true,
          productQuantity:true
        },
        skip: skip, // Skip records based on current page
        take: limit, // Limit the number of records returned
        orderBy: {
          id: "asc", // Optional: Add consistent ordering
        },
      });

      if (productsData.length===0) {
        console.error(`Error while fetching Products of ${categoryParams} category`)
        return NextResponse.json({
          success: false,
          error: "Error while fetching Products of specific category",
        });
      }
    
      const totalProductsCount = await client.product.count({
        where: {
          productStatus: "Active",
          category: categoryParams,
        },
      });

      if (!totalProductsCount) {
        console.error(
          "product data found but error while getting count of total products by category"
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
    }
  } catch (error) {
    console.error("Error while fetching product data:", error);
    return NextResponse.json({
      success: false,
      error: "Error while fetching Products data",
    });
  }
}
