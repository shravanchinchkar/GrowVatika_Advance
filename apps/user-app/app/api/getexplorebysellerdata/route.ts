import client from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sellers = await client.seller.findMany({
      select: {
        nurseryName: true,
        address: true,
        nurseryBio: true,
        specialities: true,
        location: true,
        business_hours: true,
        phoneNumber: true,
      },
    });
    if (!sellers) {
      console.error("Error while fetching sellers data from the database");
      return NextResponse.json({
        success: false,
        error: "Error while fetching sellers data",
      });
    }
    console.log("all seller data is:",sellers)
    return NextResponse.json({
      success: true,
      message: "Successfully got all the sellers data!",
      sellers: sellers,
    });
  } catch (error) {
    console.error("Error while getting sellers data:", error);
  }
}
