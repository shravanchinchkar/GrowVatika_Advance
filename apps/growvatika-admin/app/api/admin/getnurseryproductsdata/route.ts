import client from "@repo/db/client";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
    const { searchParams } = new URL(req.url);
    const nurseryId = searchParams?.get("nurseryId") || "";
    const productCategory = searchParams?.get("category") || "";

    if (nurseryId === "" || productCategory === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Input",
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
          error: `Nursery with ID ${nurseryId} does not exists!`,
        },
        { status: 404 }
      );
    }

    // Execute the following block if productCategory is All
    if (productCategory === "All") {
      const productData = await client.product.findMany({
        where: {
          sellerId: existingNursery.id,
        },
        select: {
          imageURL: true,
          name: true,
          price: true,
          compareAt: true,
          productQuantity: true,
        },
      });
      if (productData.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: `${existingNursery.nurseryName} have not published any products yet!`,
            nurseryName: existingNursery.nurseryName,
          },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: "Product data found!",
          productData,
          nurseryName: existingNursery.nurseryName,
        },
        {
          status: 200,
        }
      );
    }
    // Execute the following block if productCategory is other than all
    if (productCategory !== "All") {
      const productData = await client.product.findMany({
        where: {
          sellerId: existingNursery.id,
          category: productCategory,
        },
        select: {
          imageURL: true,
          name: true,
          price: true,
          compareAt: true,
          productQuantity: true,
        },
      });
      if (productData.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: `${existingNursery.nurseryName} have not published any products of category ${productCategory}!`,
            nurseryName: existingNursery.nurseryName,
          },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: "Product data found!",
          productData,
          nurseryName: existingNursery.nurseryName,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error while getting product data", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
