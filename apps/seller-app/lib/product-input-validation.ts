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
