import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filterParams = searchParams.get("filter");
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const limit: number = 6;
    const skip = (currentPage - 1) * Number(limit); // offset formula

    // return if the filterParams is empty
    if (!filterParams) {
      return NextResponse.json({
        success: false,
        error: "Invalid Filter",
      });
    }

    if (currentPage < 1) {
      return NextResponse.json({
        success: false,
        error: "Invalid page number",
      });
    }

    // Parse the filter parameter as JSON array
    let filterArray: string[];
    try {
      // Decode the URI component first, then parse as JSON
      const decodedFilter = decodeURIComponent(filterParams);
      filterArray = JSON.parse(decodedFilter); //convert the string to object

      // Validate that it's an array
      if (!Array.isArray(filterArray)) {
        return NextResponse.json({
          success: false,
          error: "Filter must be an array of collection names.",
        });
      }

      // Validate that all items in the array are strings
      if (!filterArray.every((item) => typeof item === "string")) {
        return NextResponse.json({
          success: false,
          error: "All filter items must be strings.",
        });
      }
    } catch (parseError) {
      console.error("Parse error:", parseError);
      return NextResponse.json({
        success: false,
        error: "Invalid filter format. Expected a JSON array.",
      });
    }

    const filterProduct = await client.product.findMany({
      where: {
        productStatus: "Active",
        collection: {
          in: filterArray, // 'in' operator matches any of the values in the array
        },
      },
      skip: skip, // Skip records based on current page
      take: limit, // Limit the number of records returned
      orderBy: {
        id: "asc", // Optional: Add consistent ordering
      },
    });

    // findMany can return an empty array, so we check length instead of falsy
    if (filterProduct.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No products found matching the filter criteria!",
      });
    }

    const totalFilterProductCount = filterProduct.length;
    const totalPages = Math.ceil(totalFilterProductCount / Number(limit));

    return NextResponse.json({
      success: true,
      filterProduct,
      totalFilterProductCount,
      totalPages,
    });
  } catch (error) {
    console.error("Error while getting filter product data:", error);
    return NextResponse.json({
      success: false,
      error: "Internal server error",
    });
  }
}
