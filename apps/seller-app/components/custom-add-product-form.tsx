import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Step 1: Define Zod validation schema
const MAX_FILE_SIZE = 300 * 1024; // 300kb
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageUploadSchema = z.object({
  image: z
    .instanceof(File, { message: "Image Is Required" })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 300kb"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
});

type ImageUploadFormData = z.infer<typeof imageUploadSchema>;

// Step 2: Create the main component
const CustomAddProductForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ImageUploadFormData>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const watchedImage = watch("image");

  // Step 3: Handle form submission
  const onSubmit = async (data: ImageUploadFormData) => {
    try {
      console.log("Form submitted:", data);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("title", data.title);
      if (data.description) {
        formData.append("description", data.description);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Image uploaded successfully!");
      reset();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
  };

  // Step 4: Create custom dropzone component
  const ImageDropzone: React.FC<{
    onDrop: (files: File[]) => void;
    error?: string;
    file?: File;
  }> = ({ onDrop, error, file }) => {
    const { getRootProps, getInputProps, isDragActive, isDragReject } =
      useDropzone({
        onDrop,
        accept: {
          "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        maxSize: 300 * 1024,
        maxFiles: 1,
        multiple: false,
      });

    return (
      <div className="w-full">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive && !isDragReject ? "border-blue-400 bg-blue-50" : ""}
            ${isDragReject ? "border-red-400 bg-red-50" : ""}
            ${error ? "border-red-400" : "border-gray-300"}
            ${!isDragActive && !error ? "hover:border-gray-400" : ""}
          `}
        >
          <input {...getInputProps()} />

          {file ? (
            <div className="space-y-4">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="max-w-full max-h-48 mx-auto rounded"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <p className="text-sm text-blue-600">
                Click or drag to replace image
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isDragActive ? (
                <p className="text-blue-600">Drop the image here...</p>
              ) : (
                <div>
                  <p className="text-gray-600">
                    <span className="font-medium text-blue-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG, WEBP up to 5MB
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Upload Image
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 5: Integrate Controller with Dropzone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image *
          </label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImageDropzone
                onDrop={(files) => {
                  if (files.length > 0) {
                    field.onChange(files[0]);
                  }
                }}
                error={errors.image?.message}
                file={field.value}
              />
            )}
          />
        </div>

        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="title"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.title ? "border-red-400" : "border-gray-300"}
                `}
                placeholder="Enter image title"
              />
            )}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image description (optional)"
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-2 px-4 rounded-md font-medium transition-colors
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            }
            text-white
          `}
        >
          {isSubmitting ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* Debug Info (remove in production) */}
      {watchedImage && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
          <strong>Debug Info:</strong>
          <br />
          File: {watchedImage.name}
          <br />
          Size: {(watchedImage.size / 1024 / 1024).toFixed(2)} MB
          <br />
          Type: {watchedImage.type}
        </div>
      )}
    </div>
  );
};

export default CustomAddProductForm;
