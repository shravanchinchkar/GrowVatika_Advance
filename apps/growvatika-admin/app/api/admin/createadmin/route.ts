import client from "@repo/db/client";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@repo/shared/utilfunctions";
import { getExistingAdminByEmail } from "@/services/admin.service";
import { adminSignupSchema, TApiResponse } from "@repo/common-types/types";

export async function POST(
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
    }

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
      // check whether the assigned admin is an admin or not.
      const existingAdmin = await client.growVatika_Admin.findFirst({
        where: {
          name: validateInput.data?.assignedBy,
        },
      });

      if (!existingAdmin) {
        return NextResponse.json(
          {
            success: false,
            error: `${validateInput.data?.assignedBy} admin is not valid!`,
          },
          { status: 400 }
        );
      }
      const isExistingEmail = await getExistingAdminByEmail(
        validateInput.data.email
      );
      if (isExistingEmail) {
        return NextResponse.json(
          {
            success: false,
            error: `Email already in use`,
          },
          { status: 400 }
        );
      }
      const hashedPassword = await hashPassword(validateInput.data.password);
      const newAdmin = await client.growVatika_Admin.create({
        data: {
          name: validateInput.data.name,
          email: validateInput.data.email,
          password: hashedPassword,
          assignedByAdminId: existingAdmin.id,
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
        { status: 201 }
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
