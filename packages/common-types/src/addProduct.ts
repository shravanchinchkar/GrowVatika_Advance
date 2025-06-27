import { z } from "zod";

// Define the validation schema for adding products
export const addProductSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Product name must be at least 2 characters" })
      .max(100, { message: "Product name must not exceed 100 characters" }),

    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .positive({ message: "Price must be greater than 0" })
      .max(999999, { message: "Price cannot exceed 999,999" }),

    compareAt: z
      .number({
        required_error: "Compare at price is required",
        invalid_type_error: "Compare at price must be a number",
      })
      .positive({ message: "Compare at price must be greater than 0" })
      .max(999999, { message: "Compare at price cannot exceed 999,999" }),

    description: z
      .string()
      .min(10, { message: "Description must have at least 10 characters" })
      .max(1000, { message: "Description must not exceed 1000 characters" }),

    productSize: z
      .number({
        required_error: "Size is required",
        invalid_type_error: "Size must be a number",
      })
      .positive({ message: "Size must be greater than 0" }),

    productQuantity: z
      .number({
        required_error: "Product quantity is required",
        invalid_type_error: "Product quantity must be a number",
      })
      .positive({ message: "Product quantity must be greater than 0" }),

    collection: z.string().min(1, { message: "Required" }),
    category: z.string().min(1, { message: "Required" }),
    tags: z.string().min(1, { message: "Required" }),
    productStatus: z.string().min(1, { message: "Product status is required" }),
    visibility: z.string().min(1, { message: "Visibility is required" }),
    
    image: z
      .instanceof(File, { message: "Image is required" })
      .refine((file) => file.size <= 300 * 1024, {
        message: "Image size must be less than 300kb",
      })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        { message: "Only JPEG, JPG, PNG, and WebP images are allowed" }
      ),
    featured: z.boolean(),
  })
  .refine((data) => data.compareAt > data.price, {
    message: "Compare at price must be greater than the regular price",
    path: ["compareAt"],
  });

export type TAddProductSchema = z.infer<typeof addProductSchema>;
