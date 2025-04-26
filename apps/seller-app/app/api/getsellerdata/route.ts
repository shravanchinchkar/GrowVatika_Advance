import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponseType, EmailOnlySchema } from "@repo/common-types/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const validateInput = EmailOnlySchema.safeParse(email);
  if (!validateInput) {
    return NextResponse.json({ success: false, error: "Invalid Email" });
  } else {
    try {
      const existingSellerData = await client.seller.findUnique({
        where: {
          email: email || "",
        },
        select: {
          nurseryName: true,
          email: true,
          phoneNumber: true,
        },
      });
      if (!existingSellerData) {
        console.error("Seller not found");

        return NextResponse.json({
          success: false,
          error: "Seller not found",
        });
      } else {
        console.log("Seller data found!");

        return NextResponse.json({
          success: true,
          message: "Seller Data found!",
          sellerData: existingSellerData,
        });
      }
    } catch (err) {
      console.error("Error while getting the data of the seller", err);

      return NextResponse.json({
        success: false,
        error: "Error while getting seller data",
      });
    }
  }
  return { success: true };
}
