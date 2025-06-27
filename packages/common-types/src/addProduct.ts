import { z } from "zod";

// Define the validation schema
export const addProductSchema = z.object({
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
  featured: z.boolean(),
  files: z
    .array(z.instanceof(File))
    .min(1, "At least one file is required")
    .max(5, "Maximum 5 files allowed")
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024), // 5MB limit
      "Each file must be smaller than 5MB"
    )
    .refine(
      (files) =>
        files.every((file) =>
          ["image/jpeg", "image/png", "image/gif", "application/pdf"].includes(
            file.type
          )
        ),
      "Only JPEG, PNG, GIF, and PDF files are allowed"
    ),
});

export type TAddProductSchema = z.infer<typeof addProductSchema>;
