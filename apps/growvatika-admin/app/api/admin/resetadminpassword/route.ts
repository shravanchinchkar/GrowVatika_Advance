import bcrypt from "bcrypt";
import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { adminResetPasswordSchema, TApiResponse } from "@repo/common-types";

export async function PATCH(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  try {
    const resetCredentials = await req.json();
    const validateInput = adminResetPasswordSchema.safeParse(resetCredentials);
    if (!validateInput.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Input",
        },
        { status: 400 }
      );
    }
    const existingAdmin = await client.growVatika_Admin.findUnique({
      where: {
        email: validateInput.data.email,
      },
    });
    if (!existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: `admin with email id ${validateInput.data.email} not found`,
        },
        { status: 400 }
      );
    }
    const hashPassword = await bcrypt.hash(
      validateInput.data.confirmNewPassword,
      10
    );
    const updatedAdmin = await client.growVatika_Admin.update({
      where: {
        email: validateInput.data.email,
      },
      data: {
        password: hashPassword,
      },
    });
    if (!updatedAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: "Error while upadting admin password",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
    });
  }
}
