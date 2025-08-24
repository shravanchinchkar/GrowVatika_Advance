import bcrypt from "bcrypt";
import client from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { adminSignupSchema, TApiResponse } from "@repo/common-types/types";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  try {
    const adminCredentials = await req.json();
    const validateInput = adminSignupSchema.safeParse(adminCredentials);
    if (!validateInput.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Inputs type",
        },
        { status: 400 }
      );
    } else {
      const isAdminExists = await client.growVatika_Admin.findUnique({
        where: { email: validateInput.data.email },
      });
      if (isAdminExists) {
        return NextResponse.json(
          {
            success: false,
            error: `Email already in use`,
          },
          { status: 400 }
        );
      }
      const hashPassword = await bcrypt.hash(validateInput.data.password, 10);
      const newAdmin = await client.growVatika_Admin.create({
        data: {
          name: validateInput.data.name,
          email: validateInput.data.email,
          password: hashPassword,
        },
      });
      if (!newAdmin) {
        return NextResponse.json(
          {
            success: false,
            error: "Error while creating new admin",
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: `${validateInput.data.name} is now growvatika admin`,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Error while creating admin",
      },
      { status: 500 }
    );
  }
}
