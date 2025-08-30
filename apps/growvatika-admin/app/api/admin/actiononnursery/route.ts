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
      const tag = searchParams.get("tag");
      if (nurseryId === "" || tag === "") {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid Id",
          },
          { status: 400 }
        );
      }
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
      if (tag === "launch") {
        await client.seller.update({
          where: {
            id: nurseryId,
          },
          data: {
            isAdminVerified: true,
            isSuspended: false,
            isRemoved: false,
            adminName: adminSession.user.name,
          },
        });
      } else if (tag === "suspend") {
        await client.seller.update({
          where: {
            id: nurseryId,
          },
          data: {
            isAdminVerified: true,
            isSuspended: true,
            isRemoved: false,
            adminName: adminSession.user.name,
          },
        });
      } else if (tag === "remove") {
        await client.seller.update({
          where: {
            id: nurseryId,
          },
          data: {
            isAdminVerified: true,
            isSuspended: true,
            isRemoved: true,
            adminName: adminSession.user.name,
          },
        });
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid tag" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: `Nursery of id:${nurseryId} removed by the growvatik admin ${adminSession.user.name}`,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
