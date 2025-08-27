import client from "@repo/db/client";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { TApiResponse } from "@repo/common-types";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
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
      const nurseryId = searchParams?.get("nurseryId") || "";
      if (nurseryId === "") {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid Id",
          },
          { status: 400 }
        );
      }

      // First, check if the nursery exists
      const existingNursery = await client.seller.findUnique({
        where: {
          id: nurseryId,
        },
      });

      if (!existingNursery) {
        return NextResponse.json(
          {
            success: false,
            error: `Nursery with ID ${nurseryId} not found`,
          },
          { status: 404 }
        );
      }

      await client.seller.update({
        where: {
          id: nurseryId,
        },
        data: {
          isAdminVerified: true,
          isSuspended: false,
          adminName: adminSession.user.name,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: `Nursery of id:${nurseryId} approved by the growvatik admin ${adminSession.user.name}`,
        },
        { status: 200 }
      );
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
