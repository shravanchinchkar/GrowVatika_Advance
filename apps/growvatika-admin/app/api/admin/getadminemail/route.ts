import client from "@repo/db/client";
import { TApiResponse } from "@repo/common-types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("adminId") || "";
    if (adminId === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Id",
        },
        { status: 400 }
      );
    }
    const existingAdminEmail = await client.growVatika_Admin.findUnique({
      where: {
        id: adminId,
      },
    });
    if (!existingAdminEmail) {
      return NextResponse.json(
        {
          success: false,
          error: `Admin with id ${adminId} not found!`,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        adminEmail: existingAdminEmail.email,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
