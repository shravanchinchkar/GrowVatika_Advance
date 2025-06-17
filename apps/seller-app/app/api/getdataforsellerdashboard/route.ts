//This route helps to get the seller business information

import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get("id");
    console.log("Email from Params:", sellerId);

    const existingSeller = await client.seller.findUnique({
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
      },
    });
    if (!existingSeller) {
      console.error("Seller Not Found!");
      return NextResponse.json({
        success: false,
        error: "Seller not found!",
      });
    } else {
      console.log("Seller Data found!");
      return NextResponse.json({
        success: true,
        message: "Seller Data found!",
        sellerData: existingSeller,
      });
    }
  } catch (error) {
    console.error(
      "Error while getting the data of the seller for seller dashboard",
      error
    );
    return NextResponse.json({
      success: false,
      error: "Error while getting seller data for seller dashboard",
    });
  }
}
