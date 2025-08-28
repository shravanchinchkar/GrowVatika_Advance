import client from "@repo/db/client";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { TApiResponse } from "@repo/common-types";
import { NextRequest, NextResponse } from "next/server";

// Helper function to safely parse boolean values
const safeParseBool = (value: string): boolean | null => {
  if (!value || value === "") return null;

  const lowerValue = value.toLowerCase();
  if (lowerValue === "true") return true;
  if (lowerValue === "false") return false;

  // Return null for invalid values
  return null;
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  try {
    const adminSession = await getServerSession(NEXT_AUTH);

    if (!adminSession) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized request",
        },
        { status: 401 }
      );
    } else {
      const { searchParams } = new URL(req.url);
      const tempData = searchParams?.get("isAdminVerified") || "";
      const tempData2 = searchParams?.get("isSuspended") || "";

      // Validate boolean parameters
      const isAdminVerified = safeParseBool(tempData);
      const isSuspended = safeParseBool(tempData2);

      if (isAdminVerified === null || isSuspended === null) {
        return NextResponse.json(
          { success: false, error: "Invalid inputs" },
          { status: 400 }
        );
      }

      const nurseriesData = await client.seller.findMany({
        where: {
          isAdminVerified: isAdminVerified,
          isSuspended: isSuspended,
        },
        select: {
          id: true,
          email: true,
          address: true,
          fullName: true,
          adminName: true,
          isSuspended: true,
          phoneNumber: true,
          nurseryName: true,
          isAdminVerified: true,
          profilePictureURL: true,
        },
      });
      const nurseryCount = await client.seller.count({});
      if (nurseriesData.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "No Nursery data found",
          },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          {
            success: true,
            message: "Data fetch successful!",
            adminNurseriesData: nurseriesData,
            totalNurseryCount: nurseryCount,
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error(
      "Error while getting nurseries data in admin dashboard",
      error
    );
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
