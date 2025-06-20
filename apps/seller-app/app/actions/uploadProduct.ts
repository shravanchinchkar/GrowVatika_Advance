"use server";
import client from "@repo/db/client";
import { NEXT_AUTH } from "../lib/auth";
import { getServerSession } from "next-auth";
import { ApiResponseType} from "@repo/common-types/types";
import { formDataToObject, validateServerProduct } from "../lib/validation";

export async function uploadProduct(
  formData: FormData
  // data:TProductSchema
): Promise<ApiResponseType> {
  // Checks whether the seller is signin or not
  const session = await getServerSession(NEXT_AUTH);
  if (!session.user) {
    return { success: false, error: "Invalid Seller" };
  }
  try {
    // Checks whether the seller exists or not
    const sellerId = await client.seller.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });
    if (!sellerId) {
      return { success: false, error: "No seller found" };
    }
    console.log("Product Data in backend is:", formData);

    // Convert FormData to object and validate with existing schema
    const productData = formDataToObject(formData);
    console.log("Converted product data:", productData);

    // Validate using existing ProductSchema
    const parsedProduct = validateServerProduct(productData);
    console.log("Validated product data:", parsedProduct.data);


    return { success: true };
  } catch (error) {
    console.log("Error While uploading Product:", error);
    return { success: false };
  }
}
