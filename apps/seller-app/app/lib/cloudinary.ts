import fs from "fs";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { ApiResponseType } from "@repo/common-types/types";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

const uploadOnCloudinary = async (
  localFilePath: any
): Promise<ApiResponseType> => {
  const session = await getServerSession();
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }
  try {
    if (!localFilePath) {
      return { success: false, error: "could not find the file path!" };
    }
    // upload the file on cloudinary
    const response: CloudinaryUploadResult = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "image", //tells what type of file is been uploaded
      }
    );
    // file has been uploaded successfully
    console.log(
      "File Uploaded successfully:",
      response.url,
      response.public_id
    );
    fs.unlinkSync(localFilePath);
    return {
      success: true,
      message: "Upload Successful",
      responseData: response,
    };
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed.
    return {success:false,error:"Upload Failed"}
  }
};
export { uploadOnCloudinary };
