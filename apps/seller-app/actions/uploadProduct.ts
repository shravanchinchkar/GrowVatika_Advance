"use server";
import client from "@repo/db/client";
import { NEXT_AUTH } from "../lib/auth";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { ApiResponseType } from "@repo/common-types/types";
import { formDataToObject } from "../helper/formDataToObject";
import { validateServerProduct } from "../lib/product-input-validation";

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

export async function uploadProduct(
  formData: FormData
): Promise<ApiResponseType> {
  try {
    // Checks whether the seller is signin or not
    const session = await getServerSession(NEXT_AUTH);
    if (!session.user) {
      return { success: false, error: "Invalid Seller" };
    }
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
    // Convert FormData to object to validate the input with the schema
    const productData = formDataToObject(formData);

    // Validate using existing ProductSchema
    const parsedProduct = validateServerProduct(productData);

    if (!parsedProduct.success) {
      return { success: false, error: "Product Input Error" };
    }

    // Extract file for upload
    const file = parsedProduct.data?.image as File | null;

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
            folder: "seller-product-images",
            resource_type: "image",
            display_name: parsedProduct.data?.name,
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

    //After uploading Image to cloudinary store all the data of the product into the Database
    const uploadProduct = await client.product.create({
      data: {
        sellerId: sellerId.id || "",
        imageURL: result.secure_url,
        name: parsedProduct.data?.name || "",
        tags: parsedProduct.data?.tags || "",
        category: parsedProduct.data?.category || "",
        visibility: parsedProduct.data?.visibility || "",
        collection: parsedProduct.data?.collection || "",
        price: parsedProduct.data?.price.toString() || "",
        description: parsedProduct.data?.description || "",
        productStatus: parsedProduct.data?.productStatus || "",
        compareAt: parsedProduct.data?.compareAt.toString() || "",
        productSize: parsedProduct.data?.productSize.toString() || "",
        productQuantity: parsedProduct.data?.productQuantity.toString() || "",
      },
    });
    if (!uploadProduct) {
      return {
        success: false,
        error: "Error while creating product",
      };
    }
    return {
      success: true,
      message: "Product Created Successfull!",
      responseData: uploadProduct,
    };
  } catch (error) {
    console.error("Error While uploading Product:", error);
    return { success: false, responseData: error };
  }
}
