import client from "@repo/db/client";
import { TApiResponse } from "@repo/common-types";
import { NextRequest, NextResponse } from "next/server";

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

    // excute the following block if there is no category filter or category===All
    if (categoryParams === "All") {
      const productsData = await client.product.findMany({
        where: {
          productStatus: "Active",
          seller: {
            isAdminVerified: true,
            isSuspended: false,
          },
        },
        select: {
          id: true,
          category: true,
          collection: true,
          name: true,
          productSize: true,
          price: true,
          compareAt: true,
          tags: true,
          imageURL: true,
          productQuantity: true,
        },
        skip: skip, // Skip records based on current page
        take: limit, // Limit the number of records returned
        orderBy: {
          id: "asc", // Optional: Add consistent ordering
        },
      });

      const totalProductsCount = await client.product.count({
        where: {
          productStatus: "Active",
        },
      });

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

      const totalPages = Math.ceil(totalProductsCount / Number(limit));

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
    }
    // Execute the following block only if there is a category filter present
    else {
      const productsData = await client.product.findMany({
        where: {
          productStatus: "Active",
          category: categoryParams,
        },
        select: {
          id: true,
          category: true,
          collection: true,
          name: true,
          productSize: true,
          price: true,
          compareAt: true,
          tags: true,
          imageURL: true,
          productQuantity: true,
        },
        skip: skip, // Skip records based on current page
        take: limit, // Limit the number of records returned
        orderBy: {
          id: "asc", // Optional: Add consistent ordering
        },
      });

      const totalProductsCount = await client.product.count({
        where: {
          productStatus: "Active",
          category: categoryParams,
        },
      });

      const totalPages = Math.ceil(totalProductsCount / Number(limit));

      if (currentPage > totalPages) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid Input",
          },
          {
            status: 400, //Bad request
          }
        );
      }

      if (productsData.length === 0) {
        console.error(`Products of ${categoryParams} category does not exists`);
        return NextResponse.json(
          {
            success: false,
            error: `Products of ${categoryParams} category does not exists`,
          },
          {
            status: 400, // bad request
          }
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
    }
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
