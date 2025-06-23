"use server";
import client from "@repo/db/client";
import { NEXT_AUTH } from "../lib/auth";
import { getServerSession } from "next-auth";
import { ApiResponseType } from "@repo/common-types/types";
import { formDataToObject, validateServerProduct } from "../lib/validation";
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

export async function uploadProduct(
  formData: FormData
  // data:TProductSchema
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
    console.log("Original Form Data from BE:", formData);

    // Convert FormData to object to validate the input with the schema
    const productData = formDataToObject(formData);
    console.log("Converted form data to object:", productData);

    // Validate using existing ProductSchema
    const parsedProduct = validateServerProduct(productData);
    console.log("Validated product data:", parsedProduct.data?.image);

    // Extract file for upload
    const file = parsedProduct.data?.image as File | null;
    console.log("Content of file is:", file);

    if (!file) {
      return { success: false, error: "File not found", status: "400" };
    }

    //file as a property know as array buffer and that will give you bytes, and from that byte you can create the buffer
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
              console.log("Image Uploaded successfully on cloudinary:", result);
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
    console.log("Cloudinary Image upload response is:", result);

    //After uploading Image to cloudinary store all the data of the product into the Database
    const uploadProduct = await client.product.create({
      data: {
        sellerId: sellerId.id || "",
        name: parsedProduct.data?.name || "",
        price: parsedProduct.data?.price.toString() || "",
        compareAt: parsedProduct.data?.compareAt.toString() || "",
        description: parsedProduct.data?.description || "",
        productSize: parsedProduct.data?.productSize.toString(),
        collection: parsedProduct.data?.collection || "",
        category: parsedProduct.data?.category || "",
        productStatus: parsedProduct.data?.productStatus || "",
        visibility: parsedProduct.data?.visibility || "",
        imageURL: result.secure_url,
      },
    });
    if (!uploadProduct) {
      return {
        success: false,
        error: "Error while creating product",
      };
    }
    console.log("Product Created successfully", uploadProduct);
    return {
      success: true,
      message: "Product Created Successfull!",
      responseData: uploadProduct,
    };
  } catch (error) {
    console.log("Error While uploading Product:", error);
    return { success: false };
  }
}
