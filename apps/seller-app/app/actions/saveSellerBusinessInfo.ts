//This route helps to post the seller business information in the database

"use server";
import client from "@repo/db/client";
import { ApiResponseType } from "@repo/common-types/types";
import { SellerData, SellerDataSchema } from "@repo/common-types/types";

export async function saveSellerBusinessInfo(
  sellerData: SellerData
): Promise<ApiResponseType> {

  console.log("Business Info Data in BE:",sellerData);
  //validate the Inputs
  const validateInput = SellerDataSchema.safeParse(sellerData);
  if (!validateInput.success) {
    return { success: false, error: "Invalid Inputs" };
  }
  try {
    const sellerExists = await client.seller.findUnique({
      where: {
        email: sellerData.email,
      },
    });
    if (!sellerExists) {
      return { success: false, error: "Invalid seller email" };
    } else {
      //"If the seller already exists but is not verified" condition is not consider here

      //Below condition assumes that seller is already verified 
      const updateExistingSeller = await client.seller.update({
        where: {
          email: sellerExists.email,
        },
        data: {
          nurseryBio: sellerData.nurseryBio,
          address: sellerData.address,
          business_hours: sellerData.businesshours,
          location: sellerData.location,
          specialities: sellerData.specialities,
        },
      });
      if (!updateExistingSeller) {
        return {
          success: false,
          error: "Error While updating seller business Information",
        };
      }
      console.log("Updated Seller Information:", updateExistingSeller);
      return {
        success: true,
        message: "Seller Business Information added Successfully",
      };
    }
  } catch (error) {
    console.error("Error While Updating seller business Information:", error);
    return { success: false };
  }
}
