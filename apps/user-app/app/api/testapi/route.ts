import { TApiResponse } from "@repo/common-types/types";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest
): Promise<NextResponse<TApiResponse>> {
  const response: TApiResponse = {
    success: true,
    message: "Success",
  };
  return NextResponse.json({
    success: true,
    message: "Hello",
  });
}
