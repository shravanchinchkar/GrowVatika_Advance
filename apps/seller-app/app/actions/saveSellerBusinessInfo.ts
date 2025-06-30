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

// Helper function to extract public_id from Cloudinary URL
function extractPublicIdFromUrl(url: string): string | null {
  try {
    const urlParts = url.split("/");
    const versionIndex = urlParts.findIndex((part) => part.startsWith("v"));
    if (versionIndex !== -1 && versionIndex < urlParts.length - 1) {
      const fileNameWithExtension: any = urlParts[urlParts.length - 1];
      const fileName = fileNameWithExtension.split(".")[0];
      return `seller-profile-images/${fileName}`;
    }
    return null;
  } catch (error) {
    console.error("Error extracting public_id from URL:", error);
    return null;
  }
}

// Helper function to delete image from Cloudinary
async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
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
        profilePictureURL: true,
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
    console.log("formData to object:", sellerData);

    //validate the Inputs
    const validateInput = SellerDataSchema.safeParse(sellerData);
    if (!validateInput.success) {
      console.error("Input error:", validateInput.error);
      return { success: false, error: "Invalid Inputs" };
    }

    // New Code goes Below
    // Extract file for upload
    const file = validateInput.data?.profilePicture as File | null;
    let profilePictureURL = existingSeller.profilePictureURL; //get existing profilePicture URL from the database

    // Handle profile picture upload
    if (file && file.size > 0) {
      // If there's an existing profile picture, delete it from Cloudinary
      if (existingSeller.profilePictureURL) {
        const publicId = extractPublicIdFromUrl(
          existingSeller.profilePictureURL
        );
        if (publicId) {
          const deleted = await deleteCloudinaryImage(publicId);
          if (!deleted) {
            console.warn("Failed to delete existing image from Cloudinary");
          }
        }
      }

      // Following is the process of uploading new image to Cloudinary
      
      // file as a property know as array buffer and that will give you bytes, and from that byte you can create the buffer
      const bytes = await file.arrayBuffer(); // converting file into array buffer
      const buffer = Buffer.from(bytes); //create buffer from bytes

      const result = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
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

      profilePictureURL = result.secure_url;
    } else if (!existingSeller.profilePictureURL) {
      // If no existing profile picture and no new file provided, return error
      return {
        success: false,
        error: "Profile picture is required",
      };
    }

    // Update seller information in database
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
        profilePictureURL: profilePictureURL, // Use the existing or new URL
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
      message: "Seller Business Information updated Successfully",
      responseData: updateExistingSeller,
    };
  } catch (error) {
    console.error("Error While Updating seller business Information:", error);
    return { success: false };
  }
}
