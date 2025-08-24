import zod from "zod";

// Following zod schema is used for the backend purpose
export const SignUpSchema = zod.object({
  fullName: zod
    .string()
    .min(2, { message: "Name must be atleast of 2 characters" })
    .optional(),
  nurseryName: zod
    .string()
    .min(2, { message: "Must contain atleast 2 characters" })
    .optional(),
  phoneNumber: zod
    .string() // Change to string to handle digit length properly
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d{10}$/, { message: "Phone number must contain only digits" })
    .optional(),
  name: zod
    .string()
    .min(2, { message: "Name must be atleast of 2 characters" })
    .optional(),
  email: zod.string().email(),
  password: zod
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
  confirmPassword: zod
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" })
    .optional(),
});

export const SignInSchema = zod.object({
  email: zod.string().email(),
  password: zod
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
  confirmPassword: zod
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" })
    .optional(),
});

export const EmailOnlySchema = zod.string().email();

//Following zod schema is used for frontend purpose
export type SignUpInputs = zod.infer<typeof SignUpSchema>;
export type SignInInputs = zod.infer<typeof SignInSchema>;
export type TEmailOnlySchema = zod.infer<typeof EmailOnlySchema>;
