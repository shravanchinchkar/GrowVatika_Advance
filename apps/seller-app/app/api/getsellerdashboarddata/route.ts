//This route helps to get the seller business information

import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get("id");

    if (!sellerId) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Id",
        },
        {
          status: 400, // Bad request
        }
      );
    }

    // get seller data from the database
    const existingSellerData = await client.seller.findUnique({
      where: {
        id: sellerId || "",
      },
      select: {
        nurseryName: true,
        nurseryBio: true,
        address: true,
        phoneNumber: true,
        email: true,
        business_hours: true,
        location: true,
        specialities: true,
        profilePictureURL: true,
      },
    });
    // Return error if seller data not found
    if (!existingSellerData) {
      console.error("Seller Not Found!");
      return NextResponse.json(
        {
          success: false,
          error: "Seller not found!",
        },
        {
          status: 400, // Bad request
        }
      );
    }

    //get seller product data from database
    const sellerProductData = await client.product.findMany({
      where: {
        sellerId: sellerId || "",
      },
      select: {
        id: true,
        name: true,
        collection: true,
        productStatus: true,
        productSizeVariant: {
          select: {
            size: true,
            price: true,
            compareAt: true,
            quantity: true,
          },
        },
      },
    });

    // Return partial error if seller product data is not found
    if (!sellerProductData) {
      console.error("Seller Data found but seller has no products to sell");
      return NextResponse.json({
        success: false,
        error: "Seller Data found but seller has no products to sell",
        sellerData: existingSellerData,
      });
    }

    // Success if both seller data and their product data is found
    return NextResponse.json({
      success: true,
      message: "Seller Data and Seller Product found!",
      sellerData: existingSellerData,
      sellerProductData: sellerProductData,
    });
  } catch (error) {
    console.error(
      "Error while getting the data of the seller and their products for seller dashboard",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "Error while getting the data of the seller and their products for seller dashboard",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
}
