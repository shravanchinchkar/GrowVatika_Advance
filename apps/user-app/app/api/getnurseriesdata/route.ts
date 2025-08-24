import { TApiResponse } from "@repo/common-types";
import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const limit: number = 6;
    const skip = (currentPage - 1) * Number(limit); // offset formula

    if (currentPage < 1) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid page number",
        },
        {
          status: 400, // Bad request
        }
      );
    }

    // Get sellers with their products in a single query
    const sellersWithProducts = await client.seller.findMany({
      where: {
        isVerified: true,
        isAdminVerified: true,
        isSuspended: false,
      },
      select: {
        id: true,
        nurseryName: true,
        address: true,
        nurseryBio: true,
        specialities: true,
        location: true,
        business_hours: true,
        phoneNumber: true,
        profilePictureURL: true,
        products: {
          where: {
            productStatus: "Active",
            imageURL: {
              not: "",
            },
          },
          select: {
            imageURL: true,
          },
        },
      },
      skip: skip, // Skip records based on current page
      take: limit, // Limit the number of records returned
      orderBy: {
        id: "asc", // Optional: Add consistent ordering
      },
    });

    const totalSellerCount = await client.seller.count({});
    const totalPages = Math.ceil(totalSellerCount / Number(limit));

    if (currentPage > totalPages) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid page number",
        },
        {
          status: 400, //Bad request
        }
      );
    }

    if (sellersWithProducts.length === 0) {
      console.error("Error while getting seller and product data");
      return NextResponse.json(
        {
          success: false,
          error: "Error while getting seller and product data",
        },
        {
          status: 400, // bad request
        }
      );
    }

    // Transform the data to match your desired structure
    const sellerWithProductData = sellersWithProducts.map((seller: any) => ({
      ...seller,
      products: seller.products.map((product: any) => product.imageURL),
      productCount: seller.products.length,
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Successfully got seller and product data!",
        sellerWithProductData: sellerWithProductData,
        totalPages: totalPages,
      },
      {
        status: 200, //Everything is ok
      }
    );
  } catch (error) {
    console.error(
      "Error while getting product data for explore by seller:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error: "Error while getting nurseries data",
      },
      {
        status: 500, // Internal server error
      }
    );
  }
}
