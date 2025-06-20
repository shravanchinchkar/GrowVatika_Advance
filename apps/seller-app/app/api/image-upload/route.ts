import { NEXT_AUTH } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponseType } from "@repo/common-types/types";

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(request: NextRequest): Promise<ApiResponseType> {
  try {
    // Check whether the user is signin or not
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user) {
      return { success: false, error: "Invalid User", status: "401" };
    }
    // Check whether the cloudinary Credentials are available or not
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      process.env.CLOUDINARY_API_SECRET
    ) {
      return {
        success: false,
        error: "Cloudinary Credentials not found",
        status: "400",
      };
    }
    // extract from data from the request body
    const formData = await request.formData();
    console.log("Form Data is :", formData);
    const file = (formData.get("file") as File) || null;
    if (!file) {
      return { success: false, error: "File Not Found", status: "400" };
    }
    const bytes = await file.arrayBuffer(); //converting file as arrayBuffer
    const buffer = Buffer.from(bytes); //creating  buffer out of arrayBuffer since we cannot upload arrayBuffer

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          // This is responsible for uploading any data on cloudinary
          { folder: "seller-product-images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );
    return {
      success: true,
      message: "Image Uploaded on cloudinary",
      responseData: result.public_id,
    };
  } catch (error) {
    console.log("Upload Image failed", error);
    return { success: false, error: "Upload Image failed", status: "500" };
  }
}
