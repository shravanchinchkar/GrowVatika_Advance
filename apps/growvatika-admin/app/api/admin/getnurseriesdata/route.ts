import client from "@repo/db/client";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { TApiResponse } from "@repo/common-types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  try {
    const adminSession = await getServerSession(NEXT_AUTH);
    if (!adminSession?.user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized request",
        },
        { status: 400 }
      );
    } else {
      const { searchParams } = new URL(req.url);
      const tempData = searchParams?.get("isAdminVerified") || "";
      const tempData2 = searchParams?.get("isSuspended") || "";
      const isAdminVerified = JSON.parse(tempData);
      const isSuspended = JSON.parse(tempData2);

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
        }
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
