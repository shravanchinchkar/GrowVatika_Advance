import {
  addProductSchema,
  TAddProductSchema
} from "@repo/common-types/types";
import { ZodError } from "zod";

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

export function formatZodErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  error.errors.forEach((err) => {
    const path = err.path.join(".");
    errors[path] = err.message;
  });

  return errors;
}

export function validateServerProduct(
  data: unknown
): ValidationResult<TAddProductSchema> {
  try {
    const result = addProductSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: formatZodErrors(error) };
    }
    return { success: false, errors: { general: "Validation failed" } };
  }
}

// FormData converter utility
export function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "image") {
      obj[key] = value; // File object
    } else if (
      key === "price" ||
      key === "compareAt" ||
      key === "productSize" ||
      key === "productQuantity"
    ) {
      obj[key] = value ? Number(value) : undefined;
    } else if (key === "featured") {
      obj[key] = value === "true";
    } else {
      obj[key] = value || undefined;
    }
  }
  return obj;
}
