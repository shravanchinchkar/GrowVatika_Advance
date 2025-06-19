import zod, { any } from "zod";

export const ProductSchema = zod
  .object({
    name: zod
      .string()
      .min(2, { message: "Product Name Must be atleast 2 characters" }),
    price: zod
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Price must be a valid number greater than 0",
      }),
    compareAt: zod
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Compare at price must be a valid number greater than 0",
      }),
    description: zod
      .string()
      .min(10, { message: "Description must have at least 10 characters" }),
    collection: zod.string().min(1, { message: "Collection is required" }),
    category: zod.string().min(1, { message: "Category is required" }),
    productStatus: zod
      .string()
      .min(1, { message: "Product status is required" }),
    visibility: zod.string().min(1, { message: "Visibility is required" }),
    featured: zod.boolean(),
    image: zod
      .custom<FileList>(
        (fileList) => fileList instanceof FileList && fileList.length > 0,
        { message: "Image is required" }
      )
      .refine(
        (fileList) =>
          fileList?.[0]?.size !== undefined &&
          fileList[0].size <= 5 * 1024 * 1024,
        { message: "Image size must be less than 5MB" }
      )
      .refine(
        (fileList) => {
          if (!fileList || !fileList[0]) return false;
          return ["image/jpeg", "image/png", "image/webp"].includes(
            fileList[0].type || ""
          );
        },
        { message: "Only JPEG, PNG, and WebP images are allowed" }
      ),
  })
  .refine((data) => Number(data.compareAt) > Number(data.price), {
    message: "Compare at price must be greater than the regular price",
    path: ["compareAt"], // This will attach the error to the compareAt field
  });

export type TProductSchema = zod.infer<typeof ProductSchema>;
