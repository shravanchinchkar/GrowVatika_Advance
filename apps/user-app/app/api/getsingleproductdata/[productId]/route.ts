import { TApiResponse } from "@repo/common-types";
import client from "@repo/db/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
): Promise<NextResponse<TApiResponse>> {
  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Id",
        },
        {
          status: 400, // Bad request
        }
      );
    }

    const productData = await client.product.findUnique({
      where: {
        id: productId || "",
      },
      include: {
        productSizeVariant: {
          select: {
            size: true,
            price: true,
            compareAt: true,
            quantity: true,
          },
        },
        seller: {
          select: {
            nurseryName: true,
            address: true,
            profilePictureURL: true,
          },
        },
      },
    });

    if (!productData) {
      return NextResponse.json(
        {
          success: false,
          error: "product not found",
        },
        {
          status: 404, // Not Found
        }
      );
    } else {
      // exclude id,sellerId,productStatus and visibility from the data and send the remaining data to FE
      const {
        sellerId,
        productStatus,
        visibility,
        ...filteredSingleProductData
      } = productData;
      return NextResponse.json(
        {
          success: true,
          message: "product data found!",
          singleProductData: filteredSingleProductData,
        },
        {
          status: 200, //Everything is Ok
        }
      );
    }
  } catch (error) {
    console.error("Error while fetching single product data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error while fetching single Product Data",
      },
      {
        status: 500, //Internal Server Error
      }
    );
  }
}
