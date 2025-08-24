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

    console.log("admin session:", adminSession);

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
      const approvedNursery = await client.seller.update({
        where: {
          id: nurseryId,
        },
        data: {
          isAdminVerified: true,
          isSuspended: false,
          adminName: adminSession.user.name,
        },
      });
      if (!approvedNursery) {
        return NextResponse.json(
          {
            success: false,
            error: "Error while approving nursery",
          },
          { status: 400 }
        );
      }
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
