import client from "@repo/db/client";
import { TApiResponse } from "@repo/common-types";
import { EmailOnlySchema } from "@repo/common-types";
import { NextRequest, NextResponse } from "next/server";
import { sendResetPassword } from "@/helper/send-reset-password-mail";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  try {
    const data = await req.json();
    const validateInput = EmailOnlySchema.safeParse(data.email);
    if (!validateInput.success) {
      return NextResponse.json(
        { success: false, error: "Invalid Input" },
        { status: 400 }
      );
    }
    const existingAdmin = await client.growVatika_Admin.findUnique({
      where: {
        email: validateInput.data,
      },
    });
    if (!existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: `No admin exists with email Id ${validateInput.data}`,
        },
        { status: 400 }
      );
    }
    const emailResponse = await sendResetPassword(
      validateInput.data,
      existingAdmin.id
    );
    if (!emailResponse.success) {
      return NextResponse.json({
        success: false,
        error: emailResponse.message,
      });
    }
    // If success in sending email
    return NextResponse.json({
      success: true,
      message: "Reset Password email send successfully!",
    });
  } catch (error) {
    console.error("Error while sending reset password link", error);
    return NextResponse.json({
      success: false,
      error: "Error while sending reset password link",
    });
  }
}
