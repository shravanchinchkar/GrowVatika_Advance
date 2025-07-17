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

    // Get sellers with their products in a single query
    const sellersWithProducts = await client.seller.findMany({
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

    if (!sellersWithProducts) {
      console.error("Error while getting seller and product data");
      return NextResponse.json({
        success: false,
        error: "Error while getting seller and product data",
      });
    }

    // Transform the data to match your desired structure
    const sellerWithProductData = sellersWithProducts.map((seller: any) => ({
      ...seller,
      products: seller.products.map((product: any) => product.imageURL),
      productCount: seller.products.length,
    }));

    const totalSellerCount = await client.seller.count({});
    const totalPages = Math.ceil(totalSellerCount / Number(limit));

    return NextResponse.json({
      success: true,
      message: "Successfully got seller and product data!",
      sellerWithProductData: sellerWithProductData,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(
      "Error while getting product data for explore by seller:",
      error
    );
  }
}
