import Image from "next/image";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState, memo } from "react";
import { toastStyle } from "@repo/shared/utilfunctions";

interface ProfilePictureUploadProps {
  blinking?: boolean;
  error?: string;
  currentImage?: string;
  enableEditing?: boolean;
  onDrop: (files: File[]) => void;
  file?: File;
}

export const SellerProfilePhotoUpload = memo(
  ({
    onDrop,
    error,
    file,
    currentImage,
    blinking,
    enableEditing,
  }: ProfilePictureUploadProps) => {
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
      useDropzone({
        onDrop,
        accept: {
          "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        maxFiles: 1,
        multiple: false,
        maxSize: 300 * 1024,
      });

    // Handle file rejection errors with toast
    useEffect(() => {
      if (fileRejections.length > 0) {
        fileRejections.forEach((rejection) => {
          const { errors } = rejection;
          errors.forEach((error) => {
            if (error.code === "file-too-large") {
              toast.error(
                "File is too large. Maximum size is 300KB",
                toastStyle
              );
              return;
            }
          });
        });
      }
    }, [fileRejections]);
    return (
      <div
        className={`lg:w-[20%] xl:w-[15%] h-[6.5rem] flex flex-col items-center cursor-not-allowed outline-none
        ${
          !currentImage && blinking && !enableEditing
            ? "border-[2px] border-dashed justify-center"
            : !currentImage &&
                enableEditing &&
                !blinking &&
                !isDragActive &&
                error
              ? "border-[2px] border-dashed border-[#FF4B4B] cursor-pointer justify-center"
              : !currentImage && enableEditing && !blinking && !isDragActive
                ? " border-[2px] border-dashed border-[#CBD0D3] cursor-pointer justify-center"
                : isDragActive
                  ? "border-[2px] border-dashed border-[#56A430] justify-center"
                  : currentImage && !enableEditing
                    ? "border-none h-max justify-start"
                    : currentImage &&
                      enableEditing &&
                      "border-[2px] justify-center border-dashed border-[#CBD0D3] cursor-pointer"
        }       
        `}
        {...getRootProps()}
      >
        {enableEditing && <input {...getInputProps()} />}
        {
          //show file preview
          file ? (
            <div className="relative w-[5rem] h-[5rem] rounded-full overflow-hidden">
              <Image
                src={URL.createObjectURL(file)}
                alt="nurseryprofile"
                fill
                className="object-cover"
              />
            </div>
          ) : currentImage ? (
            <div className="relative w-[5rem] h-[5rem] rounded-full overflow-hidden">
              <Image
                src={currentImage}
                alt="nurseryprofile"
                className="object-cover"
                fill
              />
            </div>
          ) : (
            // Default View
            <div
              className={`w-[5rem] h-[5rem] rounded-full flex justify-center items-center overflow-hidden
            ${enableEditing && !blinking && !isDragActive ? "border-[#CBD0D3]" : isDragActive && "border-[#56A430]"} border-[2px] border-dashed`}
            >
              <div className="relative w-[5rem] h-[5rem]">
                <Image
                  src={
                    "/assets/images/SellerDashboardImages/seller-image-placeholder.svg"
                  }
                  alt="uploadIcon"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )
        }
      </div>
    );
  }
);
