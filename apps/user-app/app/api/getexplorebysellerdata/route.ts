import client from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
        profilePictureURL:true,
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
    });

    if (!sellersWithProducts) {
      console.error("Error while getting seller and product data");
      return NextResponse.json({
        success: false,
        error: "Error while getting seller and product data",
      });
    }

    // Transform the data to match your desired structure
    const sellerWithProductData = sellersWithProducts.map((seller:any) => ({
      ...seller,
      products: seller.products.map((product:any) => product.imageURL),
      productCount: seller.products.length,
    }));
    return NextResponse.json({
      success: true,
      message: "Successfully got seller and product data!",
      sellerWithProductData: sellerWithProductData,
    });
  } catch (error) {
    console.error(
      "Error while getting product data for explore by seller:",
      error
    );
  }
}
