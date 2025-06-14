//This route helps to get the seller business information

import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { EmailOnlySchema } from "@repo/common-types/types";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    console.log("Email from Params:", email);

    const validateEmail = EmailOnlySchema.safeParse(email);
    if (!validateEmail) {
      return NextResponse.json({
        success: false,
        error: "Invalid Email",
      });
    } else {
      const existingSeller = await client.seller.findUnique({
        where: {
          email: email || "",
        },
        select: {
          nurseryName: true,
          nurseryBio: true,
          address:true,
          phoneNumber: true,
          email: true,
          business_hours: true,
          location: true,
          specialities:true
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
