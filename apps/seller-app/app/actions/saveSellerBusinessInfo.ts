//This route helps to post the seller business information in the database

"use server";
import client from "@repo/db/client";
import { ApiResponseType } from "@repo/common-types/types";
import { SellerData, SellerDataSchema } from "@repo/common-types/types";
import { formDataToObject } from "../helper/formDataToObject";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function saveSellerBusinessInfo(
  // sellerData: SellerData
  formData: FormData
): Promise<ApiResponseType> {
  try {
    // Checks whether the seller is signin or not
    const session = await getServerSession(NEXT_AUTH);
    if (!session.user) {
      return { success: false, error: "Invalid Seller" };
    }

    // Checks whether the seller exists or not
    const existingSeller = await client.seller.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
      },
    });
    if (!existingSeller) {
      return { success: false, error: "No seller found" };
    }

    // Check whether the cloudinary Credentials are available or not
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return {
        success: false,
        error: "Cloudinary Credentials not found",
        status: "400",
      };
    }

    // Convert form Data to object to validate the input with the schema
    const sellerData = formDataToObject(formData);

    //validate the Inputs
    const validateInput = SellerDataSchema.safeParse(sellerData);
    if (!validateInput.success) {
      console.error("Input error:",validateInput.error)
      return { success: false, error: "Invalid Inputs" };
    }

    // Extract file for upload
    const file = validateInput.data?.profilePicture as File | null;

    if (!file) {
      return { success: false, error: "File not found", status: "400" };
    }

    // file as a property know as array buffer and that will give you bytes, and from that byte you can create the buffer
    const bytes = await file.arrayBuffer(); // converting file into array buffer
    const buffer = Buffer.from(bytes); //create buffer from bytes

    // Upload the Image on cloudinary
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          //responsible for uploading anything on cloudinary
          {
            folder: "seller-profile-images",
            resource_type: "image",
            display_name: validateInput.data?.profilePicture?.name,
            use_filename_as_display_name: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              console.error("Error while uploading Image:", error);
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          }
        );
        uploadStream.end(buffer);
      }
    );
    if (!result) {
      return {
        success: false,
        error: "Error while uploading image to cloudinary",
      };
    }

    //"If the seller already exists but is not verified" condition is not consider here

    //Below condition assumes that seller is already verified
    const updateExistingSeller = await client.seller.update({
      where: {
        email: existingSeller.email,
      },
      data: {
        nurseryBio: sellerData.nurseryBio,
        address: sellerData.address,
        business_hours: sellerData.businesshours,
        location: sellerData.location,
        specialities: sellerData.specialities,
        profilePictureURL: result.secure_url,
      },
      select: {
        nurseryBio: true,
        address: true,
        business_hours: true,
        location: true,
        specialities: true,
        profilePictureURL: true,
      },
    });
    if (!updateExistingSeller) {
      return {
        success: false,
        error: "Error While updating seller business Information",
      };
    }
    return {
      success: true,
      message: "Seller Business Information added Successfully",
      responseData: updateExistingSeller,
    };
  } catch (error) {
    console.error("Error While Updating seller business Information:", error);
    return { success: false };
  }
}
