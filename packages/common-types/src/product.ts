import zod, { any } from "zod";
// Base schema with common fields
const BaseProductSchema = zod.object({
  name: zod
    .string()
    .min(2, { message: "Product name must be at least 2 characters" })
    .max(100, { message: "Product name must not exceed 100 characters" }),

  price: zod
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive({ message: "Price must be greater than 0" })
    .max(999999, { message: "Price cannot exceed 999,999" }),

  compareAt: zod
    .number({
      required_error: "Compare at price is required",
      invalid_type_error: "Compare at price must be a number",
    })
    .positive({ message: "Compare at price must be greater than 0" })
    .max(999999, { message: "Compare at price cannot exceed 999,999" }),

  description: zod
    .string()
    .min(10, { message: "Description must have at least 10 characters" })
    .max(1000, { message: "Description must not exceed 1000 characters" }),

  productSize: zod
    .number({
      required_error: "Size is required",
      invalid_type_error: "Size must be a number",
    })
    .positive({ message: "Size must be greater than 0" }),

  productQuantity: zod
    .number({
      required_error: "Product quantity is required",
      invalid_type_error: "Product quantity must be a number",
    })
    .positive({ message: "Product quantity must be greater than 0" }),

  collection: zod.string().min(1, { message: "Required" }),
  category: zod.string().min(1, { message: "Required" }),
  tags: zod.string().min(1, { message: "Required" }),
  productStatus: zod.string().min(1, { message: "Product status is required" }),
  visibility: zod.string().min(1, { message: "Visibility is required" }), 
  featured: zod.boolean(),
});

// Client-side schema (for browser forms with FileList)
export const ClientProductSchema = BaseProductSchema.extend({
  image: zod
    .custom<FileList>(
      (fileList) => fileList instanceof FileList && fileList.length > 0,
      { message: "Image is required" }
    )
    .refine(
      (fileList) => {
        const file = fileList?.[0];
        return file && file.size <= 300 * 1024; // 300KB
      },
      { message: "Image size must be less than 300KB" }
    )
    .refine(
      (fileList) => {
        const file = fileList?.[0];
        if (!file) return false;
        return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      },
      { message: "Only JPEG, PNG, and WebP images are allowed" }
    ),
}).refine((data) => data.compareAt > data.price, {
  message: "Compare at price must be greater than the regular price",
  path: ["compareAt"],
});

// Server-side schema (for FormData with File objects)
export const ServerProductSchema = BaseProductSchema.extend({
  image: zod
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image size must be less than 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "Only JPEG, PNG, and WebP images are allowed" }
    ),
}).refine((data) => data.compareAt > data.price, {
  message: "Compare at price must be greater than the regular price",
  path: ["compareAt"],
});

export type TClientProductSchema = zod.infer<typeof ClientProductSchema>;
export type TServerProductSchema = zod.infer<typeof ServerProductSchema>;

export interface SellerProductData {
  id: string;
  name: string;
  tags: string;
  price: string;
  imageURL: string;
  category: string;
  featured: boolean;
  compareAt: string;
  visibility: string;
  collection: string;
  productSize: string;
  description: string;
  productStatus: string;
  productQuantity: string;
}
