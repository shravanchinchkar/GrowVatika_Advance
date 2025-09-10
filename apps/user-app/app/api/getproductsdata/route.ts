import { TApiResponse } from "@repo/common-types";
import { NextRequest, NextResponse } from "next/server";
import {
  getProductDataByCategory,
  getTotalPages,
  getTotalProductCount,
} from "@/services/user.service";

export async function GET(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const categoryParams = searchParams.get("category")?.trim();
    const limit: number = 6;
    const skip = (currentPage - 1) * Number(limit); // offset formula

    if (currentPage < 1) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid page number",
        },
        {
          status: 400, //status code for bad request
        }
      );
    }

    const productsData = await getProductDataByCategory(
      categoryParams,
      skip,
      limit
    );

    const totalProductsCount = await getTotalProductCount();

    if (!totalProductsCount) {
      console.error(
        "product data found but error while getting count of total products"
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "product data found but error while getting count of total products",
        },
        {
          status: 404, //Not found
        }
      );
    }
    
    const totalPages = getTotalPages(totalProductsCount, limit);

    // if current page is greater than totalPages
    if (currentPage > totalPages) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid page number",
        },
        {
          status: 400, //bad request
        }
      );
    }

    if (productsData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Error while fetching Products data",
        },
        { status: 404 } // Not Found
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product data fetch successfully!",
        productsData,
        totalProductsCount,
        totalPages,
      },
      {
        status: 200, // Everything is Ok
      }
    );
  } catch (error) {
    console.error("Error while fetching product data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error while fetching Products data",
      },
      {
        status: 500, // Internal server error
      }
    );
  }
}
